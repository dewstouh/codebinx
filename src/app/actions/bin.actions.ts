'use server';

import { buildQuery } from "@/lib/utils";
import { GetBinsParams, GetBinsParamsSchema } from "@/zod/getBinParams";
import { GetBinsResponse, GetBinsResponseSchema } from "@/zod/prisma/pagination";


export async function getBins(input: Partial<GetBinsParams> = {}): Promise<GetBinsResponse> {
    const parsed = GetBinsParamsSchema.safeParse(input);

    if (!parsed.success) {
        console.error(parsed.error.format());
        throw new Error('Invalid parameters');
    }

    const query = buildQuery(parsed.data)

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bins?${query}`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        },
      });

    if (!res.ok) throw new Error(`Error fetching bins: ${res.status}`);

    const json = await res.json();

    const parsedRes = GetBinsResponseSchema.safeParse(json);

    if (!parsedRes.success) {
        console.error(parsedRes.error.flatten());
        throw new Error('Invalid API Response');
    }

    return parsedRes.data;
}
