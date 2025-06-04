'use client'

import { useState } from "react"

export function useRegister(){
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match")
            setLoading(false)
            return
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                setSuccess(true)
                // Optionally auto-login or redirect to login
                setTimeout(() => {
                    window.location.href = "/login"
                }, 2000)
            } else {
                setError(data.message || "Registration failed")
            }
        } catch (err) {
            setError(`${err}`)
            throw err
        } finally {
            setLoading(false)
        }
    }

    return {
        formData,
        setFormData,
        loading,
        error,
        success,
        handleSubmit
    }
}

