'use server'

import { parseOrError } from '@/lib/zod'
import { CommentService } from '@/packages/core/services/comment.service'
import { Zod } from '@/packages/core/zod'

export class CommentAction {
    static async create(rawData: unknown, authorClerkId: string) {
        const parsed = parseOrError(Zod.Forms.CommentSchema.Create, rawData)
        if (!parsed.success) return { success: false, issues: parsed.issues }

        return CommentService.create({
            content: parsed.data.content,
            targetId: parsed.data.targetId,
            targetType: parsed.data.targetType,
            author: {
                connect: { clerkUserId: authorClerkId },
            },
        })
    }

    static async update(commentId: string, rawData: unknown) {
        const parsed = parseOrError(Zod.Forms.CommentSchema.Create, rawData)
        if (!parsed.success) return { success: false, issues: parsed.issues }

        return CommentService.update(commentId, parsed.data.content)
    }

    static async delete(commentId: string) {
        return CommentService.delete(commentId)
    }
}
