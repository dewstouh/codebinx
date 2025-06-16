'use server'
import { parse } from '@/lib/validation'
import { BinFormSchema } from '@/validations/forms/bin.schema'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { BinService } from '@codebinx/core'

export async function createBin(rawData: unknown, authorClerkId: string) {
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

export async function deleteBin(binId: string, authorClerkId: string) {
    try {
        await BinService.delete(binId, authorClerkId)
        revalidatePath('/dashboard')
        return { success: true }
    } catch (err) {
        console.error(err)
        return { success: false, issues: { global: ['Error deleting bin'] } }
    }
}

export async function updateBin(binId: string, rawData: unknown, authorClerkId: string) {
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

export async function getBin(binId: string) {
    return BinService.getComplete(binId)
}

export async function getAllPublicBins() {
    return BinService.getAllPublicBinsWithAuthor()
}
