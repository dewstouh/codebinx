"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Code,
  Search,
  Eye,
  User,
  Clock,
  ArrowUpDown,
  Filter,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react"
import { SiteHeader } from "@/components/header"

interface Bin {
  _id: string
  binId: string
  title?: string
  content: string
  description?: string
  language: string
  isPrivate: boolean
  hasPassword: boolean
  views: number
  createdAt: string
  expiresAt?: string
  author?: {
    username: string
  }
}

export default function BinsPage() {
  const [bins, setBins] = useState<Bin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [language, setLanguage] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchBins()
  }, [page, language, sortBy])

  const fetchBins = async () => {
    setLoading(true)
    try {
      // Build query parameters
      const params = new URLSearchParams({
        public: "true",
        page: page.toString(),
        limit: "12",
      })

      if (language !== "all") {
        params.append("language", language)
      }

      if (searchTerm) {
        params.append("search", searchTerm)
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bins?${params.toString()}`,
      )

      if (!response.ok) {
        throw new Error("Failed to fetch bins")
      }

      const data = await response.json()
      setBins(data.bins)
      setTotalPages(Math.ceil(data.total / 12))
    } catch (err) {
      console.log(err)
      setError("Failed to load bins. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchBins()
  }

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      javascript: "bg-yellow-100 text-yellow-800 border-yellow-200",
      typescript: "bg-blue-100 text-blue-800 border-blue-200",
      python: "bg-green-100 text-green-800 border-green-200",
      java: "bg-orange-100 text-orange-800 border-orange-200",
      cpp: "bg-purple-100 text-purple-800 border-purple-200",
      c: "bg-blue-100 text-blue-800 border-blue-200",
      csharp: "bg-violet-100 text-violet-800 border-violet-200",
      php: "bg-indigo-100 text-indigo-800 border-indigo-200",
      ruby: "bg-red-100 text-red-800 border-red-200",
      go: "bg-cyan-100 text-cyan-800 border-cyan-200",
      rust: "bg-orange-100 text-orange-800 border-orange-200",
      html: "bg-red-100 text-red-800 border-red-200",
      css: "bg-blue-100 text-blue-800 border-blue-200",
      markdown: "bg-gray-100 text-gray-800 border-gray-200",
    }

    return colors[language] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`
    }

    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`
    }

    const diffInYears = Math.floor(diffInMonths / 12)
    return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <SiteHeader />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Public Bins</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover code snippets shared by developers from around the world
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <form onSubmit={handleSearch} className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search bins by title, description or content..."
                  className="pl-10 h-12 rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <div className="flex items-center">
                      <Filter className="w-4 h-4 mr-2 text-gray-500" />
                      <SelectValue placeholder="Language" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="csharp">C#</SelectItem>
                    <SelectItem value="php">PHP</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="css">CSS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <div className="flex items-center">
                      <ArrowUpDown className="w-4 h-4 mr-2 text-gray-500" />
                      <SelectValue placeholder="Sort by" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="views">Most Viewed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Bins Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-64 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="h-24 bg-gray-100 rounded mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-500 mb-4">
              <AlertCircle className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">{error}</h3>
            <Button onClick={fetchBins} className="mt-4">
              Try Again
            </Button>
          </div>
        ) : bins.length === 0 ? (
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
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bins.map((bin, index) => (
                <motion.div
                  key={bin._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
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
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{bin.description}</p>
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
                            <span>{formatTimeAgo(bin.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
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
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1
                      // Show current page, first, last, and pages around current
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
            )}
          </>
        )}
      </div>
    </div>
  )
}
