// app/dashboard/page.tsx

"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { IBinResponse as Bin, IUserStats as UserStats } from "@codebinx/shared"
import { UserType } from "@/types/user"
import { useApi } from "@/hooks/useApi"
import { useEffect } from "react"
import { DashboardHeader } from "./_components/DashboardHeader"
import { BinsCard } from "./_components/BinsCard"
import { StatsCards } from "./_components/StatsCard"

export default function DashboardPage() {
  const { data: userData, error: userError, loading: userLoading, request: fetchUser } = useApi<{ user: UserType }>()
  const { data: statsData, error: statsError, loading: statsLoading, request: fetchStats } = useApi<{ bin: UserStats }>()
  const { data: binsData, error: binsError, loading: binsLoading, request: fetchBins } = useApi<{ bins: Bin[] }>()

  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.href = "/login"
      return
    }

    fetchUser(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    fetchStats(`${process.env.NEXT_PUBLIC_API_URL}/api/users/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    fetchBins(`${process.env.NEXT_PUBLIC_API_URL}/api/bins/user/bins?page=1&limit=10`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }, [])

  const deleteBin = async (binId: string) => {
    if (!confirm("Are you sure you want to delete this bin?")) return

    try {
      const token = localStorage.getItem("token")
      const params = new URLSearchParams({
        public: "true",
        limit: "6"
      })
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bins/${binId}?${params}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("Failed to delete bin")
      fetchStats(`${process.env.NEXT_PUBLIC_API_URL}/api/users/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    } catch (err) {
      alert("Error deleting bin")
    }
  }

  if (userLoading && statsLoading && binsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="text-gray-500">Loading dashboard...</span>
      </div>
    )
  }

  const error = userError || statsError || binsError

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <DashboardHeader username={userData?.user.username || "User"} />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {statsData?.bin && <StatsCards stats={statsData.bin} />}

        {binsData?.bins && (
          <BinsCard
            bins={binsData.bins}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onDelete={deleteBin}
          />
        )}
      </div>
    </div>
  )
}
