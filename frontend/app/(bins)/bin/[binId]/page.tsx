"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import type { IBinResponse } from "@codebinx/shared"
import BinPassword from "./_components/BinPassword"
import BinLoading from "../../_components/BinLoading"
import BinError from "../../_components/BinError"
import BinEditor from "./_components/BinEditor"
import { useApi } from "@/hooks/useApi"
export default function BinViewPage() {
  const params = useParams()
  const binId = params.binId as string
  const { data, error, loading, request, status } = useApi<{ bin: IBinResponse }>()

  const [bin, setBin] = useState<IBinResponse | null>(null)
  const [password, setPassword] = useState("")
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordRequired, setPasswordRequired] = useState(false)

  

  useEffect(() => {
    request(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bins/${binId}`)
  }, [binId])

  useEffect(() => {
    if (status === 401) {
      setPasswordRequired(true)
    }
  }, [status])

  useEffect(() => {
    if (data?.bin) setBin(data.bin)
  }, [data])
  

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bins/${binId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (!res.ok) throw new Error("Invalid password")

      const data = await res.json()
      setBin(data.bin)
      setPasswordRequired(false)
    } catch (err) {
      return <BinError message={"An error has occurred"}/>
    } finally {
      setPasswordLoading(false)
    }
  }

  // UI flow
  if (loading) return <BinLoading />
  if (passwordRequired) return (
      <BinPassword
        onSubmit={handlePasswordSubmit}
        password={password}
        onPasswordChange={setPassword}
        loading={passwordLoading}
        error={"This bin requires a password."}
      />
    )
  if (error && status !== 401) return <BinError message={error} />
  if (!bin) return null

  return <BinEditor bin={bin} />
}
