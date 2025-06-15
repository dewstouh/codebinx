'use server'
import { parse } from '@/lib/validation'
import { BinFormSchema } from '@/validations/forms/bin.schema'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { BinService } from '@codebinx/core'

export class BinAction {
    static async create(rawData: unknown, authorClerkId: string) {
        const parsed = parse(BinFormSchema.Create, rawData)
        if (!parsed.success) return { success: false, issues: parsed.issues }

        try {
            const bin = await BinService.create({
                ...parsed.data,
                author: { connect: { clerkUserId: authorClerkId } },
            })

            revalidatePath('/dashboard')
            redirect(`/bin/${bin.binId}`)
        } catch (err) {
            console.error(err)
            return { success: false, issues: { global: ['Error creating bin'] } }
        }
    }

    static async update(binId: string, rawData: unknown, authorClerkId: string) {
        const parsed = parse(BinFormSchema.Update, rawData)
        if (!parsed.success) return { success: false, issues: parsed.issues }

        try {
            await BinService.update(binId, authorClerkId, parsed.data)
            revalidatePath(`/bin/${binId}`)
            return { success: true }
        } catch (err) {
            console.error(err)
            return { success: false, issues: { global: ['Error updating bin'] } }
        }
    }

    static async delete(binId: string, authorClerkId: string) {
        try {
            await BinService.delete(binId, authorClerkId)
            revalidatePath('/dashboard')
            return { success: true }
        } catch (err) {
            console.error(err)
            return { success: false, issues: { global: ['Error deleting bin'] } }
        }
    }

    static async unlock(binId: string, rawData: unknown) {
        const parsed = parse(BinFormSchema.Unlock, rawData)
        if (!parsed.success) return { success: false, issues: parsed.issues }

        const isValid = await BinService.checkPassword(binId, parsed.data.password)

        if (!isValid) {
            return {
                success: false,
                issues: {
                    password: ['Incorrect password'],
                },
            }
        }

        (await cookies()).set(`unlocked_bin_${binId}`, 'true', {
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // unlocked for 7 days, should be good enough
            httpOnly: false,
        })

        return { success: true }

    }

    static async get(binId: string) {
        return BinService.getComplete(binId)
    }
}
