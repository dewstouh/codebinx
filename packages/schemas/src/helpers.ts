import { ZodSchema, ZodError } from 'zod'

type ParseSuccess<T> = { success: true; data: T }
type ParseFail = { success: false; issues: Record<string, string[]> }

export function parseOrError<T>(schema: ZodSchema<T>, input: unknown): ParseSuccess<T> | ParseFail {
    const result = schema.safeParse(input)

    if (!result.success) {
        const rawIssues = result.error.flatten().fieldErrors

        const issues: Record<string, string[]> = Object.fromEntries(
            Object.entries(rawIssues).filter(([_, val]) => val !== undefined) as [string, string[]][]
        )

        return { success: false, issues }
    }

    return { success: true, data: result.data }
}

export function parseOrThrow<T>(schema: ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data)
    if (!result.success) {
        const issues = result.error.flatten().fieldErrors
        throw new Error(JSON.stringify(issues))
    }
    return result.data
}
