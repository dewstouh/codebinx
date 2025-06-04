import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Eye, User, Clock } from "lucide-react"
import { IBinResponse as Bin } from "@codebinx/shared"
import { formatTimeAgo, getLanguageColor } from "@/lib/utils"

interface BinCardProps {
    bin: Bin
}

export default function BinCard({ bin }: BinCardProps) {
    return (
        <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-200 border-0 shadow-sm rounded-2xl">
            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium text-lg text-gray-900 line-clamp-1">
                        {bin.title || `Untitled Bin`}
                    </h3>
                    <Badge className={`${getLanguageColor(bin.language)} ml-2 font-mono text-xs`}>
                        {bin.language}
                    </Badge>
                </div>

                {bin.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {bin.description}
                    </p>
                )}

                <div className="bg-gray-50 rounded-lg p-4 mb-4 overflow-hidden relative">
                    <pre className="text-xs font-mono text-gray-800 line-clamp-3 overflow-hidden">
                        {bin.content}
                    </pre>
                    <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-gray-50 to-transparent"></div>
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
                        <span>{formatTimeAgo(bin.createdAt.toString())}</span>
                    </div>
                </div>
            </div>
        </Card>
    )
}