// components/dashboard/_components/StatsCards.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Eye, BarChart3, Lock } from "lucide-react"
import { IUserStats as UserStats } from "@codebinx/shared"

interface Props {
    stats: UserStats
}

export function StatsCards({ stats }: Props) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Bins</CardTitle>
                    <FileText className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalBins}</div>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                    <Eye className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalViews}</div>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Public Bins</CardTitle>
                    <BarChart3 className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.publicBins}</div>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Private Bins</CardTitle>
                    <Lock className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.privateBins}</div>
                </CardContent>
            </Card>
        </div>
    )
}
