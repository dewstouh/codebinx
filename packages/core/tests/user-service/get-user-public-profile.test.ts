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

describe('UserService.getUserPublicProfile', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return user public profile with bins and comments', async () => {
        const clerkUserId = 'user_123'
        const mockUser = {
            username: 'testuser',
            avatarUrl: 'https://example.com/avatar.jpg',
            createdAt: new Date(),
            bins: [
                {
                    binId: 'bin_1',
                    title: 'Test Bin',
                    createdAt: new Date(),
                    views: 10,
                    language: 'javascript'
                }
            ]
        }

        const mockProfileComments = [
            {
                id: 'comment_1',
                content: 'Great profile!',
                createdAt: new Date(),
                author: {
                    username: 'commenter',
                    avatarUrl: 'https://example.com/commenter.jpg'
                }
            }
        ]

        mockPrisma.user.findUnique.mockResolvedValue(mockUser)
        mockPrisma.comment.findMany.mockResolvedValue(mockProfileComments)

        const result = await UserService.getUserPublicProfile(clerkUserId)

        expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
            where: { clerkUserId },
            select: {
                username: true,
                avatarUrl: true,
                createdAt: true,
                bins: {
                    where: { isPrivate: false },
                    orderBy: { createdAt: 'desc' },
                    select: {
                        binId: true,
                        title: true,
                        createdAt: true,
                        views: true,
                        language: true,
                    },
                },
            },
        })

        expect(mockPrisma.comment.findMany).toHaveBeenCalledWith({
            where: {
                targetType: 'profile',
                targetId: clerkUserId,
            },
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: {
                        username: true,
                        avatarUrl: true,
                    },
                },
            },
        })

        expect(result).toEqual({
            ...mockUser,
            profileComments: mockProfileComments,
        })
    })

    it('should return null for non-existent user', async () => {
        const clerkUserId = 'non_existent_user'

        mockPrisma.user.findUnique.mockResolvedValue(null)

        const result = await UserService.getUserPublicProfile(clerkUserId)

        expect(result).toBeNull()
        expect(mockPrisma.comment.findMany).not.toHaveBeenCalled()
    })
})
