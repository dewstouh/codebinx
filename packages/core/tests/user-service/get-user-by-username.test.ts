import { describe, it, expect, beforeEach, vi } from 'vitest'

// Setup mocks before imports
vi.mock('@codebinx/db', () => ({
    default: {
        user: {
            findUnique: vi.fn(),
        },
    }
}))

import { UserService } from '@codebinx/core'
import prisma from '@codebinx/db'

// Get the mocked instance
const mockPrisma = prisma as any

describe('UserService.getUserByUsername', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return user by username', async () => {
        const username = 'testuser'
        const mockUser = {
            clerkUserId: 'user_123',
            username: 'testuser',
            avatarUrl: 'https://example.com/avatar.jpg',
            createdAt: new Date(),
        }

        mockPrisma.user.findUnique.mockResolvedValue(mockUser)

        const result = await UserService.getUserByUsername(username)

        expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
            where: { username },
            select: {
                clerkUserId: true,
                username: true,
                avatarUrl: true,
                createdAt: true,
            },
        })

        expect(result).toEqual(mockUser)
    })

    it('should return null for non-existent username', async () => {
        const username = 'nonexistentuser'

        mockPrisma.user.findUnique.mockResolvedValue(null)

        const result = await UserService.getUserByUsername(username)

        expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
            where: { username },
            select: {
                clerkUserId: true,
                username: true,
                avatarUrl: true,
                createdAt: true,
            },
        })

        expect(result).toBeNull()
    })
})
