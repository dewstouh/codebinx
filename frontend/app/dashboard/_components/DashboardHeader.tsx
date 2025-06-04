// components/dashboard/_components/DashboardHeader.tsx

import Link from "next/link"
import { Code, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
    username: string
}

export function DashboardHeader({ username }: Props) {
    return (
        <header className="border-b bg-white/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Code className="h-8 w-8 text-blue-600" />
                    <span className="text-2xl font-bold text-gray-900">CodeBinX</span>
                </Link>
                <nav className="flex items-center space-x-4">
                    <Link href="/create">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            New Bin
                        </Button>
                    </Link>
                    <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                        Profile
                    </Link>
                </nav>
            </div>
            <div className="container mx-auto px-4 pt-2 pb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {username}!</h1>
                <p className="text-gray-600">Manage your bins and view your statistics</p>
            </div>
        </header>
    )
}
