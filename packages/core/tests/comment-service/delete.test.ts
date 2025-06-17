import { describe, it, expect, beforeEach, vi } from 'vitest'

// Setup mocks before imports
vi.mock('@codebinx/db', () => ({
    default: {
        comment: {
            delete: vi.fn(),
        },
    }
}))

import { CommentService } from '@codebinx/core'
import prisma from '@codebinx/db'

// Get the mocked instance
const mockPrisma = prisma as any

describe('CommentService.delete', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should delete a comment by id', async () => {
        const commentId = 'comment_123'
        
        const mockDeletedComment = {
            id: commentId,
            content: 'Deleted comment',
            createdAt: new Date(),
            updatedAt: new Date(),
            authorId: 'user_123',
            targetId: 'bin_123',
            targetType: 'bin' as const
        }

        mockPrisma.comment.delete.mockResolvedValue(mockDeletedComment)

        const result = await CommentService.delete(commentId)

        expect(mockPrisma.comment.delete).toHaveBeenCalledWith({
            where: { id: commentId }
        })
        expect(result).toEqual(mockDeletedComment)
    })

    it('should handle non-existent comment deletion', async () => {
        const commentId = 'non_existent_comment'

        mockPrisma.comment.delete.mockRejectedValue(new Error('Comment not found'))

        await expect(CommentService.delete(commentId)).rejects.toThrow('Comment not found')

        expect(mockPrisma.comment.delete).toHaveBeenCalledWith({
            where: { id: commentId }
        })
    })
})
