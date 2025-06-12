import * as z from "zod"
import { CompleteBin, RelatedBinModel, CompleteComment, RelatedCommentModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  clerkUserId: z.string(),
  email: z.string(),
  username: z.string().nullish(),
  avatarUrl: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  bins: CompleteBin[]
  comments: CompleteComment[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  bins: RelatedBinModel.array(),
  comments: RelatedCommentModel.array(),
}))
