import { parse } from "@/lib/validation"
import { UserFormSchema } from "@/validations/forms/user.schema"
import { UserService } from "@codebinx/core"
import { revalidatePath } from "next/cache"

export class UserActions {
    static async updateProfile(rawData: unknown, clerkUserId: string) {
        const parsed = parse(UserFormSchema.Update, rawData)
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