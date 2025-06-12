import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const BinModel = z.object({
  id: z.string(),
  binId: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  content: z.string(),
  language: z.string(),
  views: z.number().int().nullish(),
  expiresAt: z.coerce.date().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullish(),
  isPrivate: z.boolean(),
  password: z.string().nullish(),
  authorClerkId: z.string().nullish(),
})

export interface CompleteBin extends z.infer<typeof BinModel> {
  author?: CompleteUser | null
}

/**
 * RelatedBinModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBinModel: z.ZodSchema<CompleteBin> = z.lazy(() => BinModel.extend({
  author: RelatedUserModel.nullish(),
}))
