import prisma from '@/lib/prisma';
import { CreateBinInput } from '@/zod/createBinSchema';
import { GetBinsParams } from '@/zod/getBinParams';
import {nanoid} from 'nanoid';

export async function getBins(params: GetBinsParams) {
    const { page, limit, title, language, sortBy, sortDirection } = params;

    const where = {
        isPrivate: false,
        password: null,
        ...(title && {
            title: {
                contains: title,
                mode: "insensitive" as const,
            }
        }),
        ...(language && language !== "all" && { language: { equals: language } }),
        OR: [
            { expiresAt: null },
            { expiresAt: { gt: new Date() } }
        ]
    };

    const totalCount = await prisma.bin.count({ where });

    const bins = await prisma.bin.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
            [sortBy]: sortDirection,
          },
    });

    const hasNextPage = page * limit < totalCount;

    return {
        bins,
        pagination: {
            totalCount,
            page,
            limit,
            hasNextPage,
        },
    };
}

export async function getBin(binId: string) {
    const where = {
        binId,
    };
    const bin = await prisma.bin.findUnique({
        where,
    });
    return bin
}

export async function createBin(input: CreateBinInput & { authorClerkId?: string }) {
    const bin = await prisma.bin.create({
        data: {
            ...input,
            binId: nanoid(10),
            authorClerkId: input.authorClerkId ?? null,
        },
    });

    return bin;
}
