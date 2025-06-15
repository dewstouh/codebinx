import { Prisma } from '@prisma/client';
import prisma from '@codebinx/db';
import { nanoid } from 'nanoid'
import * as bcrypt from 'bcryptjs'


export class BinService {
    static async create(data: Prisma.BinCreateInput) {
        const { password, ...rest } = data
        return prisma.bin.create({
            data: {
                ...rest,
                ...(password ? { password: await bcrypt.hash(password, 10) } : { password: null }),
                binId: nanoid(10)
            }
        });
    }

    static async getComplete(binId: string) {
        const bin = await prisma.bin.findUnique({
            where: { binId },
            include: {
                author: true,
            },
        })

        if (!bin) return null

        const comments = await prisma.comment.findMany({
            where: {
                targetId: bin.id,
                targetType: 'bin',
            },
            include: {
                author: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        const { password, ...rest } = bin

        return {
            ...rest,
            hasPassword: !!password,
            comments
        }
    }

    static async checkPassword(binId: string, inputPassword: string): Promise<boolean> {
        const bin = await prisma.bin.findUnique({
            where: { binId },
            select: { password: true },
        })

        if (!bin || !bin.password) return false

        const match = await bcrypt.compare(inputPassword, bin.password)
        return match
    }

    static async update(binId: string, authorClerkId: string, data: Partial<Pick<Prisma.BinUpdateInput, 'title' | 'description' | 'content' | 'language' | 'isPrivate' | 'password'>>) {
        const existingBin = await prisma.bin.findUnique({
            where: { binId },
        })

        if (!existingBin || existingBin.authorId !== authorClerkId) {
            throw new Error('Not authorized or bin not found')
        }

        const { password, ...rest } = data

        if (typeof password === 'string' && password.length < 6) {
            throw new Error('Password must be at least 6 characters long')
        }

        return await prisma.bin.update({
            where: { binId },
            data: {
                ...rest,
                password: typeof password === 'string' ? await bcrypt.hash(password, 10) : null,
            }
        })
    }


    static async delete(binId: string, authorClerkId: string) {
        const bin = await prisma.bin.findUnique({
            where: { binId },
            select: { authorId: true },
        })

        if (!bin || bin.authorId !== authorClerkId) {
            throw new Error('Not authorized or bin not found')
        }

        return await prisma.bin.delete({
            where: { binId },
        })
    }
}
