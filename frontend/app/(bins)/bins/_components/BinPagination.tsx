"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BinPaginationProps {
    page: number
    totalPages: number
    setPage: (page: number) => void
}

export default function BinPagination({ page, totalPages, setPage }: BinPaginationProps) {
    if (totalPages <= 1) return null

    return (
        <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="rounded-lg"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center space-x-2">
                    {Array.from({ length: totalPages }).map((_, i) => {
                        const pageNum = i + 1
                        if (pageNum === 1 || pageNum === totalPages || (pageNum >= page - 1 && pageNum <= page + 1)) {
                            return (
                                <Button
                                    key={i}
                                    variant={pageNum === page ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setPage(pageNum)}
                                    className={`rounded-lg w-10 ${pageNum === page ? "bg-black text-white" : ""}`}
                                >
                                    {pageNum}
                                </Button>
                            )
                        } else if (
                            (pageNum === page - 2 && page > 3) ||
                            (pageNum === page + 2 && page < totalPages - 2)
                        ) {
                            return <span key={i}>...</span>
                        }
                        return null
                    })}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="rounded-lg"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
