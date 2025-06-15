import { z } from 'zod'

export const CommentFormSchema = {
    Create: z.object({
        content: z.string({ required_error: 'Comment is required' }).min(1),
        targetId: z.string({ required_error: 'Missing targetId' }).min(1),
        targetType: z.enum(['bin', 'profile'])
    }),
    Update: z.object({
        content: z
            .string({ required_error: 'Comment cannot be empty' })
            .min(1)
            .max(1000, 'Too large')
    })
}

export type CreateCommentForm = z.infer<typeof CommentFormSchema.Create>
export type UpdateCommentForm = z.infer<typeof CommentFormSchema.Update>