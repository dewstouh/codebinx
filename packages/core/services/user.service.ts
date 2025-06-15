import prisma from "@/packages/db/prisma"


export class UserService {
    static async getUserPublicProfile(clerkUserId: string) {
        const user = await prisma.user.findUnique({
            where: { clerkUserId },
            select: {
                username: true,
                avatarUrl: true,
                createdAt: true,
                bins: {
                    where: { isPrivate: false },
                    orderBy: { createdAt: 'desc' },
                    select: {
                        binId: true,
                        title: true,
                        createdAt: true,
                        views: true,
                        language: true,
                    },
                },
            },
        })

        if (!user) return null

        const profileComments = await prisma.comment.findMany({
            where: {
                targetType: 'profile',
                targetId: clerkUserId,
            },
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: {
                        username: true,
                        avatarUrl: true,
                    },
                },
            },
        })

        return {
            ...user,
            profileComments,
        }
    }

    static async getUserDashboardData(clerkUserId: string) {
        const user = await prisma.user.findUnique({
            where: { clerkUserId },
            select: {
                username: true,
                email: true,
                avatarUrl: true,
                createdAt: true,
                bins: {
                    orderBy: { createdAt: 'desc' },
                },
                comments: {
                    orderBy: { createdAt: 'desc' },
                },
            },
        })

        if (!user) return null

        const comments = await prisma.comment.findMany({
            where: {
                authorClerkId: clerkUserId,
            },
            orderBy: { createdAt: 'desc' },
        })

        const binComments = comments.filter(c => c.targetType === 'bin')
        const profileComments = comments.filter(c => c.targetType === 'profile')

        return {
            ...user,
            profileComments,
            binComments
        }
    }

    static async getUserByUsername(username: string) {
        return await prisma.user.findUnique({
            where: { username },
            select: {
                clerkUserId: true,
                username: true,
                avatarUrl: true,
                createdAt: true,
            },
        })
    }

    static async updateUserProfile(clerkUserId: string, data: {
        username?: string
        avatarUrl?: string
    }) {
        return prisma.user.update({
            where: { clerkUserId },
            data,
        })
    }
}
