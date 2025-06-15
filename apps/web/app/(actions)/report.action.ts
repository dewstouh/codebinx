'use server'

import { parse } from "@/lib/validation"
import { ReportFormSchemas } from "@/validations/forms/report.schema"
import { ReportService } from "@codebinx/core"


export class ReportAction {
    static async report(rawData: unknown, authorId: string) {
        const parsed = parse(ReportFormSchemas.Create, rawData)
        if (!parsed.success) return { success: false, issues: parsed.issues }

        await ReportService.create({
            targetType: parsed.data.targetType,
            targetId: parsed.data.targetId,
            reason: parsed.data.reason,
            authorId,
        })

        return { success: true, message: 'Report submitted' }
    }
}
