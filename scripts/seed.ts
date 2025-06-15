import prisma from '@/packages/db/prisma'
import { faker } from '@faker-js/faker'

async function main() {
    console.log('⏳ Eliminando datos anteriores...')
    await prisma.comment.deleteMany()
    await prisma.bin.deleteMany()
    await prisma.user.deleteMany()

    console.log('✅ Base de datos limpia. Generando datos...')

    const users = []

    for (let i = 0; i < 3; i++) {
        const user = await prisma.user.create({
            data: {
                clerkUserId: `user_${i}`,
                email: faker.internet.email(),
                username: faker.internet.userName(),
                avatarUrl: faker.image.avatar(),
            },
        })

        users.push(user)
    }

    for (const user of users) {
        for (let i = 0; i < 2; i++) {
            const bin = await prisma.bin.create({
                data: {
                    binId: faker.string.alphanumeric(8),
                    title: faker.lorem.words(3),
                    description: faker.lorem.sentence(),
                    content: faker.lorem.paragraph(),
                    language: faker.helpers.arrayElement(['javascript', 'typescript', 'python']),
                    isPrivate: false,
                    authorClerkId: user.clerkUserId,
                },
            })

            const randomUser = faker.helpers.arrayElement(users)

            await prisma.comment.create({
                data: {
                    content: faker.lorem.sentence(),
                    authorClerkId: randomUser.clerkUserId,
                    targetType: 'bin',
                    targetId: bin.id,
                },
            })
        }

        const commenter = faker.helpers.arrayElement(users)

        await prisma.comment.create({
            data: {
                content: faker.lorem.sentence(),
                authorClerkId: commenter.clerkUserId,
                targetType: 'profile',
                targetId: user.id,
            },
        })
    }

    console.log('🚀 Datos generados con éxito.')
}

main()
    .catch((err) => {
        console.error('❌ Error al generar datos:', err)
        process.exit(1)
    })
    .finally(() => process.exit())
