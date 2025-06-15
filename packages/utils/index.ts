import { colors } from "@/constants/colors"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLanguageColor(language: string): string {
  return colors[language] || "bg-gray-100 text-gray-800 border-gray-200"
}

export function buildQuery(params: Record<string, any>): string {
  return new URLSearchParams(
    Object.entries(params)
      .filter(([_, v]) => v !== undefined && v !== null && v !== '')
      .reduce((acc, [k, v]) => {
        acc[k] = String(v)
        return acc
      }, {} as Record<string, string>)
  ).toString()
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
