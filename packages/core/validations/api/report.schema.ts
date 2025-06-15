import { z } from 'zod'

export class ReportAPISchema {
    static Create = z.object({
        reason: z.string().min(1),
        targetId: z.string().min(1),
        targetType: z.enum(['bin', 'profile']),
    })
}

export type CreateReportAPISchema = z.infer<typeof ReportAPISchema.Create>