import type APIResponseClass from "@/lib/api/response"
import APIResponse from "@/lib/api/response"

declare global {
    var APIResponse: typeof APIResponseClass
}

globalThis.APIResponse = APIResponse