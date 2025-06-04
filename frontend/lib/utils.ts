import { colors } from "@/constants/colors"
import { BinExtensionType, BinLanguageType, extensions, languages } from "@codebinx/shared"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFileExtension = (language: string): BinExtensionType | "txt" => {
  return language in extensions ? extensions[language as BinLanguageType] : "txt"
}

export function formatTimeAgo(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) return `${diffInDays}d ago`
    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths < 12) return `${diffInMonths}mo ago`
    const diffInYears = Math.floor(diffInMonths / 12)
    return `${diffInYears}y ago`
}

export function getLanguageColor(language: string): string {
  return colors[language] || "bg-gray-100 text-gray-800 border-gray-200"
}