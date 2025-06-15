import { z } from 'zod';



export const ReportFormSchemas = {
    Create: z.object({
        targetType: z.enum(['bin', 'user', 'comment']),
        targetId: z.string().min(1),
        reason: z
            .string()
            .min(10, 'Reason must have, at least, 10 characters.')
            .max(1000, '1000 Characters maximum'),
    })
}

export type CreateReportFormSchemas = z.infer<typeof ReportFormSchemas.Create>
