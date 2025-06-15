import { faker } from '@faker-js/faker';
import prisma from '@codebinx/db'

async function main() {
    console.log('⏳ Deleting previous data...')
    await prisma.comment.deleteMany()
    await prisma.bin.deleteMany()
    await prisma.user.deleteMany()

    console.log('✅ Cleared database, generating new data...')

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
                    authorId: user.clerkUserId,
                },
            })

            const randomUser = faker.helpers.arrayElement(users)

            await prisma.comment.create({
                data: {
                    content: faker.lorem.sentence(),
                    authorId: randomUser.clerkUserId,
                    targetType: 'bin',
                    targetId: bin.id,
                },
            })
        }

        const commenter = faker.helpers.arrayElement(users)

        await prisma.comment.create({
            data: {
                content: faker.lorem.sentence(),
                authorId: commenter.clerkUserId,
                targetType: 'profile',
                targetId: user.clerkUserId,
            },
        })
    }

    console.log('🚀 Data ready.')
}

main()
    .catch((err) => {
        console.error('❌ Error generating data:', err)
        process.exit(1)
    })
    .finally(() => process.exit())
