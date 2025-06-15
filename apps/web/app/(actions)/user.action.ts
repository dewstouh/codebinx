import { parseOrError } from "@/lib/zod"
import { UserService } from "@/packages/core/services/user.service"
import { Zod } from "@/packages/core/zod"
import { revalidatePath } from "next/cache"

export class UserActions {
    static async updateProfile(rawData: unknown, clerkUserId: string) {
        const parsed = parseOrError(Zod.Forms.UserSchema.Update, rawData)
        if (!parsed.success) return { success: false, issues: parsed.issues }

        try {
            await UserService.updateUserProfile(clerkUserId, parsed.data)
            revalidatePath(`/dashboard`)
            revalidatePath(`/user/${parsed.data.username}`)
            return { success: true }
        } catch (err) {
            console.error(err)
            return { success: false, issues: { global: ['Error updating the profile'] } }
        }
      }
}