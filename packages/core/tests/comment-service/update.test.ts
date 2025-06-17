import { describe, it, expect, beforeEach, vi } from 'vitest'

// Setup mocks before imports
vi.mock('@codebinx/db', () => ({
    default: {
        comment: {
            update: vi.fn(),
        },
    }
}))

import { CommentService } from '@codebinx/core'
import prisma from '@codebinx/db'

// Get the mocked instance
const mockPrisma = prisma as any

describe('CommentService.update', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should update comment content', async () => {
        const commentId = 'comment_123'
        const newContent = 'Updated comment content'
        
        const mockUpdatedComment = {
            id: commentId,
            content: newContent,
            createdAt: new Date(),
            updatedAt: new Date(),
            authorId: 'user_123',
            targetId: 'bin_123',
            targetType: 'bin' as const
        }

        mockPrisma.comment.update.mockResolvedValue(mockUpdatedComment)

        const result = await CommentService.update(commentId, newContent)

        expect(mockPrisma.comment.update).toHaveBeenCalledWith({
            where: { id: commentId },
            data: { content: newContent },
        })
        expect(result).toEqual(mockUpdatedComment)
    })

    it('should handle empty content update', async () => {
        const commentId = 'comment_123'
        const newContent = ''
        
        const mockUpdatedComment = {
            id: commentId,
            content: newContent,
            createdAt: new Date(),
            updatedAt: new Date(),
            authorId: 'user_123',
            targetId: 'bin_123',
            targetType: 'bin' as const
        }

        mockPrisma.comment.update.mockResolvedValue(mockUpdatedComment)

        const result = await CommentService.update(commentId, newContent)

        expect(mockPrisma.comment.update).toHaveBeenCalledWith({
            where: { id: commentId },
            data: { content: newContent },
        })
        expect(result).toEqual(mockUpdatedComment)
    })
})
