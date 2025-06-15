import { BinAPISchema } from "@/packages/core/zod/api/bin.schema";
import { CommentAPISchema } from "@/packages/core/zod/api/comment.schema";
import { ReportAPISchema } from "@/packages/core/zod/api/report.schema";
import { UserAPISchema } from "@/packages/core/zod/api/user.schema";

export const API = {
    BinSchema: BinAPISchema,
    CommentSchema: CommentAPISchema,
    UserSchema: UserAPISchema,
    ReportSchema: ReportAPISchema
  }