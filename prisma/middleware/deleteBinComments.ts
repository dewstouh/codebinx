import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const deleteBinCommentsMiddleware: Prisma.Middleware = async (params, next) => {
    if (params.model === 'Bin' && params.action === 'delete') {
        const binId = params.args.where.id

        await prisma.comment.deleteMany({
            where: {
                targetType: 'bin',
                targetId: binId,
            },
        })
    }

    return next(params)
}
