import { Badge } from "@/app/components/ui/badge"
import { Card } from "@/app/components/ui/card"
import { Eye, User, Clock, ExternalLink, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { getLanguageColor } from "@/lib/web-utils"
import Link from "next/link"
import {formatDistanceToNow} from 'date-fns';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/app/components/ui/dropdown-menu"
import { Button } from "@/app/components/ui/button"

export default function BinCard({ bin }: { bin: BinWithRelations }) {
    return (
        <Link href={`/bins/${bin.binId}`}>
            <Card className="h-full flex flex-col justify-between p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border-0">
                <div>
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-lg text-gray-900 line-clamp-1">
                            {bin.title || `Untitled Bin`}
                        </h3>
                        <Badge className={`${getLanguageColor(bin.language.toLowerCase())} ml-2 font-mono text-xs`}>
                            {bin.language}
                        </Badge>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {bin.description || "No description"}
                    </p>
                </div>

                <div className="flex flex-col justify-end">
                    <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-hidden relative">
                        <pre className="text-xs font-mono text-gray-200 line-clamp-3 overflow-hidden">
                            {bin.content}
                        </pre>
                        <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none"></div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                <span>{bin.views}</span>
                            </div>
                            {bin.author && (
                                <div className="flex items-center">
                                    <User className="h-3 w-3 mr-1" />
                                    <span>{bin.author.username}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{formatDistanceToNow(bin.createdAt.toString())}</span>
                        </div>

                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </Card>

        </Link>
    )
}