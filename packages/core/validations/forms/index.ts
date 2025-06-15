import { BinFormSchema } from "@/packages/core/zod/forms/bin.schema";
import { CommentFormSchema } from "@/packages/core/zod/forms/comment.schema";
import { ReportFormSchemas } from "@/packages/core/zod/forms/report.schema";
import { UserFormSchema } from "@/packages/core/zod/forms/user.schema";

export const Forms = {
    BinSchema: BinFormSchema,
    CommentSchema: CommentFormSchema,
    UserSchema: UserFormSchema,
    ReportSchema: ReportFormSchemas
  }