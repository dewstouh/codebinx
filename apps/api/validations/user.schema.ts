import { z } from 'zod'

export class UserAPISchema {
    static Update = z.object({
        username: z.string().min(3).max(20),
        avatarUrl: z.string().url().optional(),
    })

    static GetByUsername = z.object({
        username: z.string().min(1),
    })

    static GetByClerkUserID = z.object({
        clerkUserId: z.string().min(1),
    })
}

export type UpdateUserAPISchema = z.infer<typeof UserAPISchema.Update>
export type GetByUsernameUserAPISchema = z.infer<typeof UserAPISchema.GetByUsername>
export type GetByClerkUserIDUserAPISchema = z.infer<typeof UserAPISchema.GetByClerkUserID>