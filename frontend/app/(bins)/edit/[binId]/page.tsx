"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SiteHeader } from "@/components/header"
import { AlertCircle, CheckCircle, ArrowLeft } from "lucide-react"
import { isAuthenticated } from "@/lib/auth"
import { IBinResponse as Bin, IBinResponse } from '@codebinx/shared'
import { CodeEditor } from "../../_components/CodeEditor"
import { BinSettings } from "../../_components/BinSettings"
import { ErrorState } from "./_components/ErrorState"
import { useApi } from "@/hooks/useApi"
import BinPassword from "../../_components/BinPassword"
import { verifyBinPassword } from "../../_lib/verifyPassword"
import { Loading } from "@/app/_components/Loading"

// COMPONENT
export default function EditBinPage() {
  const params = useParams()
  const router = useRouter()
  const binId = params.binId as string
  const { data, error, loading, request, status } = useApi<{ bin: IBinResponse }>()

  const [formData, setFormData] = useState<Bin | null>(null)
  const [originalBin, setOriginalBin] = useState<Bin | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [success, setSuccess] = useState("")
  const [localError, setLocalError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [editorLoading, setEditorLoading] = useState(true)
  const [passwordChanged, setPasswordChanged] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [passwordRequired, setPasswordRequired] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }
    request(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bins/${binId}`)
  }, [binId])


  useEffect(() => {
    if (status === 401) {
      setPasswordRequired(true)
    }
  }, [status])

  useEffect(() => {
    if (data?.bin) {
      setOriginalBin(data.bin)
      setFormData(data.bin)
    }
  }, [data])

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordLoading(true)

    try {
      const bin = await verifyBinPassword(binId, password)
      setOriginalBin(bin)
      setFormData(bin)
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

  const handleSave = async () => {
    if (!formData) return
    setSaving(true)
    setSuccess("")

    try {
      const token = localStorage.getItem("token")
      const updateData: any = {
        title: formData.title,
        content: formData.content,
        description: formData.description,
        language: formData.language,
        isPrivate: formData.isPrivate,
      }
      if (passwordChanged) updateData.password = newPassword

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bins/${binId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) throw new Error((await response.json()).message || "Update failed")

      setFormData(updateData)
      setOriginalBin(updateData)
      setSuccess("Bin updated successfully!")
      setPasswordChanged(false)
      setNewPassword("")
    } catch (err: any) {
      <ErrorState message={err.message || "Failed to update bin"} />
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this bin?")) return

    setDeleting(true)

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bins/${binId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) throw new Error((await response.json()).message || "Delete failed")

      router.push("/dashboard")
    } catch (err: any) {
      <ErrorState message={err.message || "Failed to delete bin"} />
      setDeleting(false)
    }
  }

  const handleEditorChange = (value: string | undefined) => {
    if (formData) setFormData({ ...formData, content: value || "" })
  }

  const handleEditorDidMount = () => setEditorLoading(false)

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
  if (error && !formData && status !== 401) return <ErrorState message={error} />
  if (!formData) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Edit Bin</h1>
          <p className="text-xl text-gray-600">Make changes to your bin and save them</p>
        </motion.div>

        {error && status !== 401 && <Alert variant="destructive" className="mb-6"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}
        {success && <Alert className="mb-6 border-green-200 bg-green-50"><CheckCircle className="h-4 w-4 text-green-600" /><AlertDescription className="text-green-800">{success}</AlertDescription></Alert>}

        <div className="grid lg:grid-cols-3 gap-8">
          <BinSettings
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSave}
            loading={saving}
            submitLabel="Save Changes"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            passwordChanged={passwordChanged}
            setPasswordChanged={setPasswordChanged}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            showDelete
            onDelete={handleDelete}
            deleteLoading={deleting}
          />

          <CodeEditor
            formData={formData}
            handleEditorChange={handleEditorChange}
            handleEditorDidMount={handleEditorDidMount}
            editorLoading={editorLoading}
          />
        </div>
      </div>
    </div>
  )
}
