// app/_components/LatestBinsSection.tsx

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { AlertCircle, Clock, Code, ExternalLink, Eye, Users } from "lucide-react"
import { IBinResponse as Bin } from "@codebinx/shared"
import { formatTimeAgo, getLanguageColor } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function LatestBinsSection() {
    const [latestBins, setLatestBins] = useState<Bin[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        ; (async () => {
            try {
                const params = new URLSearchParams({ public: "true", limit: "5" })
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bins?${params}`
                )
                if (!res.ok) throw new Error("Failed to fetch latest bins")
                const json = await res.json()
                setLatestBins(json.bins || [])
            } catch (err: any) {
                console.error(err)
                setError("Could not load latest bins")
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        <section className="min-h-screen flex items-center justify-center py-20 px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Latest Public Bins
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Check out what the community is sharing right now
                    </p>
                </motion.div>

                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading
                        ? // Skeletons de carga
                        [...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-64 animate-pulse"
                            >
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2 mb-8"></div>
                                <div className="h-24 bg-gray-100 rounded mb-4"></div>
                                <div className="flex justify-between">
                                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                </div>
                            </motion.div>
                        ))
                        : latestBins.length === 0
                            ? (
                                <div className="col-span-3 text-center py-12">
                                    <div className="text-gray-400 mb-4">
                                        <Code className="h-12 w-12 mx-auto" />
                                    </div>
                                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                                        No bins found
                                    </h3>
                                    <p className="text-gray-600 mb-6">Be the first to share a bin!</p>
                                    <Link href="/create">
                                        <Button className="bg-black hover:bg-gray-800 text-white rounded-xl">
                                            Create a Bin
                                        </Button>
                                    </Link>
                                </div>
                            )
                            : latestBins.map((bin, index) => (
                                <motion.div
                                    key={bin.binId}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Link href={`/bin/${bin.binId}`}>
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
                                                                <Users className="h-3 w-3 mr-1" />
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
                                    </Link>
                                </motion.div>
                            ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link href="/bins">
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-8 py-4 text-lg font-medium border-gray-300"
                        >
                            Browse All Bins
                            <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
