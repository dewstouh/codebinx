import { ZodSchema } from "zod"

export function parse<T>(schema: ZodSchema<T>, data: unknown) {
    const res = schema.safeParse(data)
    if (!res.success) {
        return { ok: false as const, issues: res.error.flatten().fieldErrors }
    }
    return { ok: true as const, value: res.data }
}