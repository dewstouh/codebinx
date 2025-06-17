import { describe, it, expect, beforeEach, vi } from 'vitest'

// Setup mocks before imports
vi.mock('@codebinx/db', () => ({
    default: {
        comment: {
            create: vi.fn(),
        },
    }
}))

import { CommentService } from '@codebinx/core'
import prisma from '@codebinx/db'

// Get the mocked instance
const mockPrisma = prisma as any

describe('CommentService.create', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should create a bin comment', async () => {
        const mockComment = {
            id: 'comment_1',
            content: 'Great code!',
            createdAt: new Date(),
            updatedAt: new Date(),
            authorId: 'user_123',
            targetId: 'bin_123',
            targetType: 'bin' as const
        }

        mockPrisma.comment.create.mockResolvedValue(mockComment)

        const data = {
            content: 'Great code!',
            author: { connect: { clerkUserId: 'user_123' } },
            targetId: 'bin_123',
            targetType: 'bin' as const
        }

        const result = await CommentService.create(data)

        expect(mockPrisma.comment.create).toHaveBeenCalledWith({ data })
        expect(result).toEqual(mockComment)
    })

    it('should create a profile comment', async () => {
        const mockComment = {
            id: 'comment_2',
            content: 'Nice profile!',
            createdAt: new Date(),
            updatedAt: new Date(),
            authorId: 'user_123',
            targetId: 'user_456',
            targetType: 'profile' as const
        }

        mockPrisma.comment.create.mockResolvedValue(mockComment)

        const data = {
            content: 'Nice profile!',
            author: { connect: { clerkUserId: 'user_123' } },
            targetId: 'user_456',
            targetType: 'profile' as const
        }

        const result = await CommentService.create(data)

        expect(mockPrisma.comment.create).toHaveBeenCalledWith({ data })
        expect(result).toEqual(mockComment)
    })
})
