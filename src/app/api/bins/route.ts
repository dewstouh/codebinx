import { NextRequest, NextResponse } from 'next/server';
import { createBin, getBins } from '@/services/bin.service';
import { GetBinsParams, GetBinsParamsSchema } from '@/zod/getBinParams';
import { auth } from '@clerk/nextjs/server';
import { CreateBinSchema } from '@/zod/createBinSchema';
import { parseOrBadRequest } from '@/lib/zod';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const queryObject = Object.fromEntries(searchParams.entries());

    const parsed = parseOrBadRequest(GetBinsParamsSchema, queryObject)
    if (!parsed.success) return parsed.response;

    try {
        const bins = await getBins(parsed.data);

        return new APIResponse()
            .json(bins)

    } catch (err) {
        console.error('[GET /api/bins]', err);
        return new APIResponse()
            .status(500)
            .message("Internal Server Error")
            .error("server_error")
    }
}

export async function POST(req: Request) {
    const { userId } = await auth();

    const body = await req.json();

    const parsed = parseOrBadRequest(CreateBinSchema, body)
    if (!parsed.success) return parsed.response;

    try {
        const bin = await createBin({
            ...parsed.data,
            authorClerkId: userId ?? undefined,
        });

        return new APIResponse()
        .status(201)
        .json(bin)
        
    } catch (err) {
        console.error('[POST /api/bins]', err);
        return new APIResponse()
            .status(500)
            .message("Internal Server Error")
            .error("server_error")
    }
}
