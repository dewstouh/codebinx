import prisma from '@codebinx/db';


export class ReportService {
    static async create(data: Prisma.ReportUncheckedCreateInput) {
        return prisma.report.create({ data })
      }
}
