import prisma from '@codebinx/db';
import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid'
import * as bcrypt from 'bcryptjs'

export class BinService {
    static async createBin(data: Omit<Prisma.BinCreateInput, 'binId'>) {
        return prisma.bin.create({
            data: {
                ...data,
                binId: nanoid(10)
            }
         });
    }

    static async getCompleteBin(binId: string) {
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

    static async checkBinPassword(binId: string, inputPassword: string): Promise<boolean> {
        const bin = await prisma.bin.findUnique({
            where: { binId },
            select: { password: true },
        })

        if (!bin || !bin.password) return false

        const match = await bcrypt.compare(inputPassword, bin.password)
        return match
    }

    static async updateBin(binId: string, authorClerkId: string, data: Partial<Pick<Prisma.BinUpdateInput, 'title' | 'description' | 'content' | 'language' | 'isPrivate' | 'password'>>) {
        const existingBin = await prisma.bin.findUnique({
            where: { binId },
            select: { authorClerkId: true },
        })

        if (!existingBin || existingBin.authorClerkId !== authorClerkId) {
            throw new Error('Not authorized or bin not found')
        }

        return await prisma.bin.update({
            where: { binId },
            data,
        })
    }


    static async deleteBin(binId: string, authorClerkId: string) {
        const bin = await prisma.bin.findUnique({
            where: { binId },
            select: { authorClerkId: true },
        })

        if (!bin || bin.authorClerkId !== authorClerkId) {
            throw new Error('Not authorized or bin not found')
        }

        return await prisma.bin.delete({
            where: { binId },
        })
    }
}
