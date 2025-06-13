import { Language } from '@/types/language';
import { binParamsFields } from '@/zod/getBinParams';
import { z } from 'zod';

export const CreateBinSchema = z.object({
    title: z.string().min(1).max(100),
    content: z.string().min(1),
    language: z.enum(Object.keys(Language) as [string, ...string[]]),
    description: z.string().max(300).optional(),
    isPrivate: z.boolean(),
    password: z.string().optional(),
});

export const CreateBinFormSchema = CreateBinSchema.omit({ content: true })
export type CreateBinFormInput = z.infer<typeof CreateBinFormSchema>

export type CreateBinInput = z.infer<typeof CreateBinSchema>;