import { CommentService } from "@codebinx/core/services/comment"

export type CreatedComment = Awaited<
    ReturnType<typeof CommentService.create>
>

export type UpdatedComment = Awaited<
    ReturnType<typeof CommentService.update>
>

export type DeletedComment = Awaited<
    ReturnType<typeof CommentService.delete>
>
