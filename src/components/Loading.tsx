import React from "react"
import { Code } from "lucide-react"

export function Loading({ message = "Loading..." }) {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center">
            <div className="text-center">
                <Code className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
                <p className="text-gray-600">{message}</p>
            </div>
        </div>
    )
}
