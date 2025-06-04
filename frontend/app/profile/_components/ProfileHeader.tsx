// app/profile/_components/ProfileHeader.tsx

"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code } from "lucide-react"

export function ProfileHeader() {
    return (
        <header className="border-b bg-white/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Code className="h-8 w-8 text-blue-600" />
                    <span className="text-2xl font-bold text-gray-900">CodeBinX</span>
                </Link>
                <nav className="flex items-center space-x-4">
                    <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                        Dashboard
                    </Link>
                    <Link href="/create">
                        <Button variant="outline">New Bin</Button>
                    </Link>
                </nav>
            </div>
        </header>
    )
}
