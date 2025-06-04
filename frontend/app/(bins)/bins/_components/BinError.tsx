"use client"

import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BinErrorProps {
    error: string
    onRetry: () => void
}

export default function BinError({ error, onRetry }: BinErrorProps) {
    return (
        <div className="text-center py-20">
            <div className="text-red-500 mb-4">
                <AlertCircle className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">{error}</h3>
            <Button onClick={onRetry} className="mt-4">
                Try Again
            </Button>
        </div>
    )
}
