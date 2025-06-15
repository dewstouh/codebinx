import {z} from 'zod';

export class CommentFormSchema{
    static Create = z.object({
        content: z.string().min(1, 'Comment is required'),
        targetId: z.string().min(1, 'Missing targetId'),
        targetType: z.enum(['bin', 'profile']),
    })

    static Update = z.object({
        content: z.string().min(1, 'Comment cannot be empty').max(1000, 'Too large'),
    })
    
}

export type CreateCommentFormSchema = z.infer<typeof CommentFormSchema.Create>
export type UpdateCommentFormSchema = z.infer<typeof CommentFormSchema.Update>