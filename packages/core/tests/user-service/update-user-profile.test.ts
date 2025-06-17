import { describe, it, expect, beforeEach, vi } from 'vitest'

// Setup mocks before imports
vi.mock('@codebinx/db', () => ({
    default: {
        user: {
            update: vi.fn(),
        },
    }
}))

import { UserService } from '@codebinx/core'
import prisma from '@codebinx/db'

// Get the mocked instance
const mockPrisma = prisma as any

describe('UserService.updateUserProfile', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should update user username', async () => {
        const clerkUserId = 'user_123'
        const updateData = { username: 'newusername' }
        
        const mockUpdatedUser = {
            clerkUserId,
            username: 'newusername',
            email: 'test@example.com',
            avatarUrl: 'https://example.com/avatar.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        mockPrisma.user.update.mockResolvedValue(mockUpdatedUser)

        const result = await UserService.updateUserProfile(clerkUserId, updateData)

        expect(mockPrisma.user.update).toHaveBeenCalledWith({
            where: { clerkUserId },
            data: updateData,
        })

        expect(result).toEqual(mockUpdatedUser)
    })

    it('should update user avatar URL', async () => {
        const clerkUserId = 'user_123'
        const updateData = { avatarUrl: 'https://example.com/newavatar.jpg' }
        
        const mockUpdatedUser = {
            clerkUserId,
            username: 'testuser',
            email: 'test@example.com',
            avatarUrl: 'https://example.com/newavatar.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        mockPrisma.user.update.mockResolvedValue(mockUpdatedUser)

        const result = await UserService.updateUserProfile(clerkUserId, updateData)

        expect(mockPrisma.user.update).toHaveBeenCalledWith({
            where: { clerkUserId },
            data: updateData,
        })

        expect(result).toEqual(mockUpdatedUser)
    })

    it('should update both username and avatar URL', async () => {
        const clerkUserId = 'user_123'
        const updateData = { 
            username: 'newusername',
            avatarUrl: 'https://example.com/newavatar.jpg'
        }
        
        const mockUpdatedUser = {
            clerkUserId,
            username: 'newusername',
            email: 'test@example.com',
            avatarUrl: 'https://example.com/newavatar.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        mockPrisma.user.update.mockResolvedValue(mockUpdatedUser)

        const result = await UserService.updateUserProfile(clerkUserId, updateData)

        expect(mockPrisma.user.update).toHaveBeenCalledWith({
            where: { clerkUserId },
            data: updateData,
        })

        expect(result).toEqual(mockUpdatedUser)
    })

    it('should handle empty update data', async () => {
        const clerkUserId = 'user_123'
        const updateData = {}
        
        const mockUpdatedUser = {
            clerkUserId,
            username: 'testuser',
            email: 'test@example.com',
            avatarUrl: 'https://example.com/avatar.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        mockPrisma.user.update.mockResolvedValue(mockUpdatedUser)

        const result = await UserService.updateUserProfile(clerkUserId, updateData)

        expect(mockPrisma.user.update).toHaveBeenCalledWith({
            where: { clerkUserId },
            data: updateData,
        })

        expect(result).toEqual(mockUpdatedUser)
    })
})
