import { ZodTypeAny, ZodError, z } from "zod"
import { NextResponse } from "next/server"
import APIResponse from "@/lib/api/response";

export function parseOrBadRequest<S extends ZodTypeAny>(
    schema: S,
    data: unknown
): { success: true; data: z.infer<S> } | { success: false; response: NextResponse } {
    const parsed = schema.safeParse(data)

    if (!parsed.success) {
        return {
            success: false,
            response: new APIResponse().status(400).json(
                {
                    message: "Invalid parameters",
                    error: "invalid_parameters",
                    details: parsed.error.format(),
                },
            ),
        }
    }

    return { success: true, data: parsed.data }
}
