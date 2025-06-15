import { colors } from "@/constants/colors";

export function getLanguageColor(language: string): string {
    return colors[language] || "bg-gray-100 text-gray-800 border-gray-200"
}

export const buildQuery = (params: Record<string, unknown>): string =>
    new URLSearchParams(
        Object.entries(params).flatMap(([k, v]) =>
            v === undefined || v === null || v === '' ? [] :
                Array.isArray(v) ? v.map(val => [k, String(val)]) :
                    [[k, String(v)]]
        )
    ).toString()

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));