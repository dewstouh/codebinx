import { z } from 'zod';

export const CreateBinSchema = z.object({
    title: z.string().min(1).max(100),
    content: z.string().min(1),
    language: z.string().min(1),
    description: z.string().max(300).optional(),
    isPrivate: z.boolean().default(false),
    password: z.string().optional(),
});

export type CreateBinInput = z.infer<typeof CreateBinSchema>;