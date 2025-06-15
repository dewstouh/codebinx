'use server'

import { parse } from "@/lib/validation"
import { CommentFormSchema } from "@/validations/forms/comment.schema"
import { CommentService } from "@codebinx/core"

export class CommentAction {
    static async create(rawData: unknown, authorClerkId: string) {
        const parsed = parse(CommentFormSchema.Create, rawData)
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
        const parsed = parse(CommentFormSchema.Update, rawData)
        if (!parsed.success) return { success: false, issues: parsed.issues }

        return CommentService.update(commentId, parsed.data.content)
    }

    static async delete(commentId: string) {
        return CommentService.delete(commentId)
    }
}
