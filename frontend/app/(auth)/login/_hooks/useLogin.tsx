'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function useLogin() {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get("token")
        if (token) {
            localStorage.setItem("token", token)
            router.push("/dashboard")
        }
    }, [router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
            const data = await res.json()

            if (res.ok) {
                localStorage.setItem("token", data.token)
                router.push("/dashboard")
            } else {
                setError(data.message || "Login failed")
            }
        } catch {
            setError("Network error. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/auth/google`
    }

    return {
        formData,
        setFormData,
        loading,
        error,
        handleSubmit,
        handleGoogleLogin,
    }
}
