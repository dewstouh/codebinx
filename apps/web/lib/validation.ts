import { ZodSchema } from "zod"

export function parse<T>(schema: ZodSchema<T>, data: unknown) {
    const res = schema.safeParse(data)
    if (!res.success) {
        return { success: false as const, issues: res.error.flatten().fieldErrors }
    }
    return { success: true as const, data: res.data }
}