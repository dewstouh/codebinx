import * as z from "zod"
import { CommentTargetType } from "@prisma/client"
import { CompleteUser, RelatedUserModel } from "./index"

export const CommentModel = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  authorClerkId: z.string(),
  targetType: z.nativeEnum(CommentTargetType),
  targetId: z.string(),
})

export interface CompleteComment extends z.infer<typeof CommentModel> {
  author: CompleteUser
}

/**
 * RelatedCommentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCommentModel: z.ZodSchema<CompleteComment> = z.lazy(() => CommentModel.extend({
  author: RelatedUserModel,
}))
