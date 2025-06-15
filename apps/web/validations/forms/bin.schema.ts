import { z } from 'zod';


const base = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().max(300).optional(),
    content: z.string().min(1, 'Content is required'),
    language: z.string().min(1, 'Language is required'),
    isPrivate: z.boolean().default(false),
    password: z.string().min(4, 'Minimum 4 characters').max(100).optional().or(z.literal('')),
})


export const BinFormSchema = {
    Create: base,
    Update: base,
    Delete: z.object({ confirm: z.literal('DELETE') }),
    Unlock: z.object({ password: z.string().min(1, 'Introduce the password') })
}

export type CreateBinFormSchema = z.infer<typeof BinFormSchema.Create>
export type UpdateBinFormSchema = z.infer<typeof BinFormSchema.Update>
export type DeleteBinFormSchema = z.infer<typeof BinFormSchema.Delete>
export type UnlockBinFormSchema = z.infer<typeof BinFormSchema.Unlock>