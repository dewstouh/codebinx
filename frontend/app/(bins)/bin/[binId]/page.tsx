"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import type { IBinResponse } from "@codebinx/shared"
import BinPassword from "../../_components/BinPassword"
import BinError from "../../_components/BinError"
import BinEditor from "./_components/BinEditor"
import { useApi } from "@/hooks/useApi"
import { verifyBinPassword } from "../../_lib/verifyPassword"
import { Loading } from "@/app/_components/Loading"
export default function BinViewPage() {
  const params = useParams()
  const binId = params.binId as string
  const { data, error, loading, request, status } = useApi<{ bin: IBinResponse }>()

  const [bin, setBin] = useState<IBinResponse | null>(null)
  const [password, setPassword] = useState("")
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordRequired, setPasswordRequired] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)


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
      const bin = await verifyBinPassword(binId, password)
      setBin(bin)
      setPasswordRequired(false)
    } catch (err) {
      if (err instanceof Error && err.message === "INVALID_PASSWORD") {
        setLocalError("Invalid password")
      } else {
        setLocalError("Something went wrong")
      }
      setPasswordLoading(false)
    }
  }

  // UI flow
  if (loading) return <Loading />
  if (passwordRequired) return (
    <BinPassword
      onSubmit={handlePasswordSubmit}
      password={password}
      onPasswordChange={setPassword}
      loading={passwordLoading}
      error={localError}
    />
  )
  if (error && status !== 401) return <BinError message={error} />
  if (!bin) return null

  return <BinEditor bin={bin} />
}
