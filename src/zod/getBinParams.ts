import { z } from 'zod'
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/constants/pagination'
import { Language } from '@/types/language'

export const binParamsFields = {
    page: z.coerce.number().int().positive().default(DEFAULT_PAGE),
    limit: z.coerce.number().int().positive().max(100).default(DEFAULT_LIMIT),
    title: z.string().default(""),
    language: z.union([
        z.literal("all"),
        z.enum(Object.keys(Language) as [string, ...string[]])
    ]).default("all"),
    sortBy: z.enum(['createdAt', 'views']).default('createdAt'),
    sortDirection: z.enum(['asc', 'desc']).default('desc'),
}

export const GetBinsParamsSchema = z.object(binParamsFields)
export type GetBinsParams = z.infer<typeof GetBinsParamsSchema>
