import { describe, it, expect, beforeEach, vi } from 'vitest'

// Setup mocks before imports
vi.mock('@codebinx/db', () => ({
    default: {
        user: {
            findUnique: vi.fn(),
        },
        comment: {
            findMany: vi.fn(),
        },
    }
}))

import { UserService } from '@codebinx/core'
import prisma from '@codebinx/db'

// Get the mocked instance
const mockPrisma = prisma as any

describe('UserService.getUserDashboardData', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return user dashboard data with bins and comments', async () => {
        const clerkUserId = 'user_123'
        const mockUser = {
            username: 'testuser',
            email: 'test@example.com',
            avatarUrl: 'https://example.com/avatar.jpg',
            createdAt: new Date(),
            bins: [
                {
                    id: 'bin_1',
                    title: 'Test Bin',
                    createdAt: new Date(),
                }
            ],
            comments: [
                {
                    id: 'comment_1',
                    content: 'Test comment',
                    createdAt: new Date(),
                }
            ]
        }

        const mockComments = [
            {
                id: 'comment_1',
                content: 'Bin comment',
                targetType: 'bin' as const,
                createdAt: new Date(),
            },
            {
                id: 'comment_2',
                content: 'Profile comment',
                targetType: 'profile' as const,
                createdAt: new Date(),
            }
        ]

        mockPrisma.user.findUnique.mockResolvedValue(mockUser)
        mockPrisma.comment.findMany.mockResolvedValue(mockComments)

        const result = await UserService.getUserDashboardData(clerkUserId)

        expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
            where: { clerkUserId },
            select: {
                username: true,
                email: true,
                avatarUrl: true,
                createdAt: true,
                bins: {
                    orderBy: { createdAt: 'desc' },
                },
                comments: {
                    orderBy: { createdAt: 'desc' },
                },
            },
        })

        expect(mockPrisma.comment.findMany).toHaveBeenCalledWith({
            where: {
                authorId: clerkUserId,
            },
            orderBy: { createdAt: 'desc' },
        })

        expect(result).toEqual({
            ...mockUser,
            profileComments: [mockComments[1]], // profile comments
            binComments: [mockComments[0]], // bin comments
        })
    })

    it('should return null for non-existent user', async () => {
        const clerkUserId = 'non_existent_user'

        mockPrisma.user.findUnique.mockResolvedValue(null)

        const result = await UserService.getUserDashboardData(clerkUserId)

        expect(result).toBeNull()
        expect(mockPrisma.comment.findMany).not.toHaveBeenCalled()
    })
})
