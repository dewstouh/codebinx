"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { IBinResponse as Bin, IUserStats as UserStats } from "@codebinx/shared"
import { UserType } from "@/types/user"
import { useApi } from "@/hooks/useApi"
import { DashboardHeader } from "./_components/DashboardHeader"
import { BinsCard } from "./_components/BinsCard"
import { StatsCards } from "./_components/StatsCard"
import { Loading } from "../_components/Loading"

export default function DashboardPage() {
  const { data: userData, error: userError, loading: userLoading, request: fetchUser } = useApi<{ user: UserType }>()
  const { data: statsData, error: statsError, loading: statsLoading, request: fetchStats } = useApi<{ bin: UserStats }>()
  const { data: binsData, error: binsError, loading: binsLoading, request: fetchBins } = useApi<{ bins: Bin[] }>()

  const [searchTerm, setSearchTerm] = useState("")

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  const fetchAllDashboardData = () => {
    if (!token) {
      window.location.href = "/login"
      return
    }

    const headers = { Authorization: `Bearer ${token}` }
    fetchUser(`${API_URL}/api/auth/profile`, { headers })
    fetchStats(`${API_URL}/api/users/stats`, { headers })
    fetchBins(`${API_URL}/api/bins/user/bins?page=1&limit=10`, { headers })
  }

  useEffect(() => {
    fetchAllDashboardData()
  }, [])

  const deleteBin = async (binId: string) => {
    if (!confirm("Are you sure you want to delete this bin?")) return
    if (!token) return

    try {
      const res = await fetch(`${API_URL}/api/bins/${binId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error("Failed to delete bin")
      fetchAllDashboardData()
    } catch (err) {
      alert("Error deleting bin")
    }
  }

  const isLoading = userLoading || statsLoading || binsLoading
  const error = userError || statsError || binsError

  if (isLoading) {
    return <Loading/>
  }

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
