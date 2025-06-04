"use client"

import Link from "next/link"
import { Code } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BinEmptyProps {
    searchTerm: string
    language: string
}

export default function BinEmpty({ searchTerm, language }: BinEmptyProps) {
    return (
        <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
                <Code className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No bins found</h3>
            <p className="text-gray-600 mb-6">
                {searchTerm || language !== "all"
                    ? "Try adjusting your search or filters"
                    : "Be the first to share a bin!"}
            </p>
            <Link href="/create">
                <Button>Create a Bin</Button>
            </Link>
        </div>
    )
}
