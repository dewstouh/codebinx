// src/zod/paginationSchemas.ts
import { z } from 'zod';
import { BinModel } from './index';

export const GetBinsResponseSchema = z.object({
    bins: z.array(BinModel),
    pagination: z.object({
        totalCount: z.number(),
        page: z.number(),
        limit: z.number(),
        hasNextPage: z.boolean(),
    }),
});

export type GetBinsResponse = z.infer<typeof GetBinsResponseSchema>;
