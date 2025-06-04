"use client"

import type React from "react"
import { useState } from "react"
import { SuccessCard } from "./_components/SuccessCard"
import { SiteHeader } from "@/components/header"
import { PageHeader } from "./_components/PageHeader"
import { ErrorAlert } from "./_components/ErrorAlert"
import { CodeEditor } from "../_components/CodeEditor"
import { BinSettings } from "../_components/BinSettings"

const initialFormData = {
  title: "",
  content: "",
  description: "",
  language: "javascript",
  isPrivate: false,
  password: "",
  expiresIn: "30",
}

export default function CreateBinPage() {
  const [formData, setFormData] = useState(initialFormData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState<{ binId: string } | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [editorLoading, setEditorLoading] = useState(true)
  const [passwordChanged, setPasswordChanged] = useState(false)
  const [newPassword, setNewPassword] = useState("")


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("token")
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      }

      if (token) headers["Authorization"] = `Bearer ${token}`

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bins`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          ...formData,
          title: formData.title || "Untitled Bin",
          password: formData.password || undefined,
          expiresIn: Number.parseInt(formData.expiresIn),
        }),
      })

      const data = await response.json()
      if (response.ok) {
        setSuccess({ binId: data.bin.binId })
      } else {
        setError(data.message || "Failed to create bin")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleEditorChange = (value: string | undefined) => {
    setFormData(prev => ({ ...prev, content: value || "" }))
  }

  const handleEditorDidMount = () => setEditorLoading(false)

  if (success) return <SuccessCard binId={success.binId} />

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <PageHeader />
        {error && <ErrorAlert message={error} />}
        <div className="grid lg:grid-cols-3 gap-8">
          <BinSettings
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            loading={loading}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            passwordChanged={passwordChanged}
            setPasswordChanged={setPasswordChanged}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
          />
          <CodeEditor {...{ formData, handleEditorChange, handleEditorDidMount, editorLoading }} />
        </div>
      </div>
    </div>
  )
}

// Aquí irían los componentes desglosados: SuccessCard, PageHeader, ErrorAlert, SettingsPanel, CodeEditor
