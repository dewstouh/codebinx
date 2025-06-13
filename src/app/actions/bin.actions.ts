'use server';

import { buildQuery } from "@/lib/utils";
import { CreateBinInput, CreateBinSchema } from "@/zod/createBinSchema";
import { GetBinParams, GetBinParamsSchema, GetBinsParams, GetBinsParamsSchema } from "@/zod/getBinParams";
import { BinModel, CompleteBin } from "@/zod/prisma";
import { GetBinsResponse, GetBinsResponseSchema } from "@/zod/prisma/pagination";
import { z } from "zod";
import { cookies } from "next/headers"




export async function getBin(input: GetBinParams):Promise<CompleteBin>{

    const parsed = GetBinParamsSchema.safeParse(input)

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bins`, {
        method: "POST",
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsed.data),
    });

    if (!res.ok) throw new Error(`Error fetching bin: ${res.status}`);


    const json = await res.json();

    const parsedRes = BinModel.safeParse(json);

    if (!parsedRes.success) {
        console.error(parsedRes.error.flatten());
        throw new Error('Invalid API Response');
    }

    return parsedRes.data;
}

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

export async function createBin(input: CreateBinInput):Promise<z.infer<typeof BinModel>> {
    const parsed = CreateBinSchema.safeParse(input)

    if (!parsed.success) {
        console.error(parsed.error.format());
        throw new Error('Invalid parameters');
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bins`, {
        method: "POST",
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsed.data),
    });

    if (!res.ok) throw new Error(`Error creating bin: ${res.status}`);

    const json = await res.json();

    const parsedRes = BinModel.safeParse(json);

    if (!parsedRes.success) {
        console.error(parsedRes.error.flatten());
        throw new Error('Invalid API Response');
    }

    return parsedRes.data;
}
