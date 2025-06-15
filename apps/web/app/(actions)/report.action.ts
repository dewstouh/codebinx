'use server'

import { ReportService } from '@/packages/core/services/report.service'
import { parseOrError } from '@/packages/core/validations/zod'
import { Zod } from '@/packages/core/zod'

export class ReportAction {
    static async report(rawData: unknown, authorClerkId: string) {
        const parsed = parseOrError(Zod.Forms.ReportSchema.Create, rawData)
        if (!parsed.success) return { success: false, issues: parsed.issues }

        await ReportService.create({
            targetType: parsed.data.targetType,
            targetId: parsed.data.targetId,
            reason: parsed.data.reason,
            authorClerkId,
        })

        return { success: true, message: 'Report submitted' }
    }
}
