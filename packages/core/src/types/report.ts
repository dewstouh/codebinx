import { ReportService } from "@codebinx/core/services/report";

export type CreatedReport = Awaited<
    ReturnType<typeof ReportService.create>
>
