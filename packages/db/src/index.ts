import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

type AcceleratedClient = ReturnType<PrismaClient['$extends']>

declare global {
    var prisma: AcceleratedClient | undefined
}

export const prisma: AcceleratedClient =
    globalThis.prisma ?? new PrismaClient().$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
