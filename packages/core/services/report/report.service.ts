import prisma from '@codebinx/db';
import { Prisma } from '@prisma/client';


export class ReportService {
    static async create(data: Prisma.ReportUncheckedCreateInput) {
        return prisma.report.create({ data })
      }
}
