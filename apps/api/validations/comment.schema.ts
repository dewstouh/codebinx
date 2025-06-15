import { z } from 'zod'


export class CommentAPISchema {
    static Create = z.object({
        content: z.string().min(1),
        targetId: z.string().min(1),
        targetType: z.enum(['bin', 'profile']),
    })

    static Update = z.object({
        commentId: z.string().min(1),
        content: z.string().min(1),
    })

    static Delete = z.object({
        commentId: z.string().min(1),
    })
}

export type CreateCommentAPISchema = z.infer<typeof CommentAPISchema.Create>
export type UpdateCommentAPISchema = z.infer<typeof CommentAPISchema.Update>
export type DeleteCommentAPISchema = z.infer<typeof CommentAPISchema.Delete>