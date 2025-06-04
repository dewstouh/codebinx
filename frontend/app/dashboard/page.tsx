"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Code, Plus, Eye, Calendar, Edit, Trash2, Search, BarChart3, FileText, Lock, AlertCircle } from "lucide-react"

interface UserStats {
  totalBins: number
  totalViews: number
  publicBins: number
  privateBins: number
}

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
}

interface UserType {
  username: string
  email: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserType | null>(null)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [bins, setBins] = useState<Bin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.href = "/login"
      return
    }

    fetchUserData()
    fetchStats()
    fetchBins()
  }, [page])

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (err) {
      console.error("Failed to fetch user data")
    }
  }

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/users/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data.bin)
      }
    } catch (err) {
      console.error("Failed to fetch stats")
    }
  }

  const fetchBins = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bins/user/bins?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.ok) {
        const data = await response.json()
        setBins(data.bins)
      } else {
        setError("Failed to load bins")
      }
    } catch (err) {
      setError("Network error. Please try again.")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteBin = async (binId: string) => {
    if (!confirm("Are you sure you want to delete this bin?")) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bins/${binId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setBins(bins.filter((bin) => bin.binId !== binId))
        fetchStats() // Refresh stats
      } else {
        alert("Failed to delete bin")
      }
    } catch (err) {
      alert("Network error. Please try again.")
      throw err
    }
  }

  const filteredBins = bins.filter(
    (bin) =>
      bin.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bin.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bin.language.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Code className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
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
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.username}!</h1>
          <p className="text-gray-600">Manage your bins and view your statistics</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        {stats && (
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
        )}

        {/* Bins Section */}
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
                    <Plus className="h-4 w-4 mr-2" />
                    New Bin
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredBins.length === 0 ? (
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
                {filteredBins.map((bin) => (
                  <div key={bin._id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
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

                        {bin.description && <p className="text-gray-600 text-sm mb-2">{bin.description}</p>}

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
                          onClick={() => deleteBin(bin.binId)}
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
      </div>
    </div>
  )
}
