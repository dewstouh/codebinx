import { BinService } from "@codebinx/core/services/bin"

export type CreatedBin = Awaited<ReturnType<typeof BinService.create>>

export type RawCompleteBin = Awaited<ReturnType<typeof BinService.getComplete>>

export type CompleteBin = NonNullable<RawCompleteBin>

export type GetBinsResponse = Awaited<
    ReturnType<typeof BinService.getAllPublicBinsWithAuthor>
>
export type BinWithAuthor = GetBinsResponse[number]

export type CheckPasswordResult = Awaited<
    ReturnType<typeof BinService.checkPassword>
>

export type UpdatedBin = Awaited<
    ReturnType<typeof BinService.update>
>

export type DeletedBin = Awaited<
    ReturnType<typeof BinService.delete>
>
