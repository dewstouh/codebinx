import { ZodSchema } from 'zod';

export function parseOrResponse<T>(schema: ZodSchema<T>, data: unknown) {
    const result = schema.safeParse(data)
    if (!result.success) {
        const issues = result.error.flatten().fieldErrors
        return Response.json({ error: 'Invalid input', issues }, { status: 400 })
    }

    return result.data
}
