import { ApiResponse } from "@/types/api"
import { useState } from "react"

export function useApi<T = any>(): ApiResponse<T> {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [status, setStatus] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)

    const request = async (input: RequestInfo, init?: RequestInit) => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(input, init)
            if(res.status) setStatus(res.status)
            if (!res.ok) throw new Error(await res.text())
            const json = await res.json()
            setData(json)
        } catch (err: any) {
            setError(err.message || "Unexpected error")
            setData(null)
        } finally {
            setLoading(false)
        }
    }

    return { data, error, loading, request, status }
  }