import { UserService } from "@codebinx/core/services/user"

export type RawPublicProfile = Awaited<
    ReturnType<typeof UserService.getUserPublicProfile>
>
export type PublicProfile = NonNullable<RawPublicProfile>

export type RawDashboardData = Awaited<
    ReturnType<typeof UserService.getUserDashboardData>
>
export type DashboardData = NonNullable<RawDashboardData>

export type RawUserByUsername = Awaited<
    ReturnType<typeof UserService.getUserByUsername>
>
export type UserByUsername = NonNullable<RawUserByUsername>

export type UpdatedUserProfile = Awaited<
    ReturnType<typeof UserService.updateUserProfile>
>
