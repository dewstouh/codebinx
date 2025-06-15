import prisma from '@codebinx/db';
import { Prisma } from '@prisma/client';


export class CommentService {
    static async create(data: Prisma.CommentCreateInput) {
        return prisma.comment.create({ data })
    }

    static async update(id: string, content: string) {
        return prisma.comment.update({
            where: { id },
            data: { content },
        })
    }

    static async delete(id: string) {
        return prisma.comment.delete({ where: { id } })
      }
}
