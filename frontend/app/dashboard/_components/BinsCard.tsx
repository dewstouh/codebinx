// components/dashboard/_components/BinsCard.tsx

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IBinResponse as Bin } from "@codebinx/shared"
import {
    FileText,
    Search,
    Eye,
    Calendar,
    Edit,
    Trash2,
    Lock,
} from "lucide-react"

interface Props {
    bins: Bin[]
    searchTerm: string
    setSearchTerm: (value: string) => void
    onDelete: (id: string) => void
}

export function BinsCard({ bins, searchTerm, setSearchTerm, onDelete }: Props) {
    const filtered = bins.filter(
        (bin) =>
            bin.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bin.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bin.language.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <Card className="shadow-lg border-0">
            <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <CardTitle>Your Bins</CardTitle>
                        <CardDescription>Manage and view all your created bins</CardDescription>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search bins..."
                                className="pl-10 w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Link href="/create">
                            <Button>
                                <FileText className="h-4 w-4 mr-2" />
                                New Bin
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {filtered.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No bins found</h3>
                        <p className="text-gray-600 mb-4">
                            {searchTerm ? "No bins match your search criteria." : "You haven't created any bins yet."}
                        </p>
                        <Link href="/create">
                            <Button>Create Your First Bin</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filtered.map((bin) => (
                            <div key={bin.binId} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="font-medium text-gray-900">{bin.title || `Untitled Bin`}</h3>
                                            <Badge variant={bin.isPrivate ? "destructive" : "secondary"}>
                                                {bin.isPrivate ? "Private" : "Public"}
                                            </Badge>
                                            <Badge variant="outline">{bin.language}</Badge>
                                            {bin.hasPassword && (
                                                <Badge variant="outline">
                                                    <Lock className="h-3 w-3 mr-1" />
                                                    Protected
                                                </Badge>
                                            )}
                                        </div>

                                        {bin.description && (
                                            <p className="text-gray-600 text-sm mb-2">{bin.description}</p>
                                        )}

                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Eye className="h-3 w-3" />
                                                {bin.views} views
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(bin.createdAt).toLocaleDateString()}
                                            </span>
                                            <span>ID: {bin.binId}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 ml-4">
                                        <Link href={`/bin/${bin.binId}`}>
                                            <Button size="sm" variant="outline">
                                                <Eye className="h-4 w-4 mr-1" />
                                                View
                                            </Button>
                                        </Link>
                                        <Link href={`/edit/${bin.binId}`}>
                                            <Button size="sm" variant="outline">
                                                <Edit className="h-4 w-4 mr-1" />
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => onDelete(bin.binId)}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <Trash2 className="h-4 w-4 mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
