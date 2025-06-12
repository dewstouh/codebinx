import { NextRequest, NextResponse } from 'next/server';
import { createBin, getBins } from '@/services/bin.service';
import { GetBinsParamsSchema } from '@/zod/getBinParams';
import { auth } from '@clerk/nextjs/server';
import { CreateBinSchema } from '@/zod/createBinSchema';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const queryObject = Object.fromEntries(searchParams.entries());

    const parsed = GetBinsParamsSchema.safeParse(queryObject);

    if (!parsed.success) {
        return NextResponse.json(
            { error: 'Invalid parameters', details: parsed.error.format() },
            { status: 400 }
        );
    }

    try {
        const data = await getBins(parsed.data);
        return NextResponse.json(data);
    } catch (err) {
        console.error('[GET /api/bins]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const { userId } = await auth();

    const body = await req.json();
    const parsed = CreateBinSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: 'Invalid data', details: parsed.error.format() },
            { status: 400 }
        );
    }

    try {
        const bin = await createBin({
            ...parsed.data,
            authorClerkId: userId ?? undefined,
        });

        return NextResponse.json(bin, { status: 201 });
    } catch (err) {
        console.error('[POST /api/bins]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
