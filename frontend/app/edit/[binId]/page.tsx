"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SiteHeader } from "@/components/header"
import { Code, Eye, EyeOff, Lock, AlertCircle, CheckCircle, ArrowLeft, Settings, Save, Trash2 } from "lucide-react"
import { isAuthenticated } from "@/lib/auth"

const LANGUAGES = [
  { value: "javascript", label: "JavaScript", icon: "🟨" },
  { value: "typescript", label: "TypeScript", icon: "🔷" },
  { value: "python", label: "Python", icon: "🐍" },
  { value: "java", label: "Java", icon: "☕" },
  { value: "cpp", label: "C++", icon: "⚡" },
  { value: "c", label: "C", icon: "🔧" },
  { value: "csharp", label: "C#", icon: "💜" },
  { value: "php", label: "PHP", icon: "🐘" },
  { value: "ruby", label: "Ruby", icon: "💎" },
  { value: "go", label: "Go", icon: "🐹" },
  { value: "rust", label: "Rust", icon: "🦀" },
  { value: "swift", label: "Swift", icon: "🍎" },
  { value: "kotlin", label: "Kotlin", icon: "🎯" },
  { value: "html", label: "HTML", icon: "🌐" },
  { value: "css", label: "CSS", icon: "🎨" },
  { value: "json", label: "JSON", icon: "📋" },
  { value: "markdown", label: "Markdown", icon: "📝" },
  { value: "sql", label: "SQL", icon: "🗄️" },
  { value: "bash", label: "Bash", icon: "💻" },
  { value: "plaintext", label: "Plain Text", icon: "📄" },
]

interface Bin {
  _id: string
  binId: string
  title?: string
  content: string
  description?: string
  language: string
  isPrivate: boolean
  hasPassword: boolean
  password?: string
  views: number
  createdAt: string
  expiresAt?: string
  author?: {
    username: string
  }
}

export default function EditBinPage() {
  const params = useParams()
  const router = useRouter()
  const binId = params.binId as string

  const [formData, setFormData] = useState<Bin | null>(null)
  const [originalBin, setOriginalBin] = useState<Bin | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [editorLoading, setEditorLoading] = useState(true)
  const [passwordChanged, setPasswordChanged] = useState(false)
  const [newPassword, setNewPassword] = useState("")

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }

    fetchBin()
  }, [binId])

  const getMonacoLanguage = (lang: string): string => {
    const languageMap: Record<string, string> = {
      javascript: "javascript",
      typescript: "typescript",
      python: "python",
      java: "java",
      cpp: "cpp",
      c: "c",
      csharp: "csharp",
      php: "php",
      ruby: "ruby",
      go: "go",
      rust: "rust",
      swift: "swift",
      kotlin: "kotlin",
      html: "html",
      css: "css",
      json: "json",
      markdown: "markdown",
      sql: "sql",
      bash: "shell",
      plaintext: "plaintext",
    }
    return languageMap[lang] || "plaintext"
  }

  const fetchBin = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bins/${binId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 403) {
          setError("You don't have permission to edit this bin")
        } else {
          setError("Failed to load bin. It may not exist or may have expired.")
        }
        return
      }

      const data = await response.json()
      setFormData(data)
      setOriginalBin(data)
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData) return

    setSaving(true)
    setError("")
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

      // Only include password if it was changed
      if (passwordChanged) {
        updateData.password = newPassword
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bins/${binId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to update bin")
      }

      const data = await response.json()
      setFormData(data)
      setOriginalBin(data)
      setSuccess("Bin updated successfully!")

      // Reset password state
      setPasswordChanged(false)
      setNewPassword("")
    } catch (err: any) {
      setError(err.message || "Failed to update bin")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this bin? This action cannot be undone.")) {
      return
    }

    setDeleting(true)
    setError("")

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bins/${binId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to delete bin")
      }

      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Failed to delete bin")
      setDeleting(false)
    }
  }

  const handleEditorChange = (value: string | undefined) => {
    if (formData) {
      setFormData({ ...formData, content: value || "" })
    }
  }

  const handleEditorDidMount = () => {
    setEditorLoading(false)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordChanged(true)
    setNewPassword(e.target.value)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SiteHeader />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto">
              <Code className="w-8 h-8 animate-pulse" />
            </div>
            <p className="text-gray-600 text-lg">Loading bin...</p>
          </motion.div>
        </div>
      </div>
    )
  }

  if (error && !formData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SiteHeader />
        <div className="flex items-center justify-center h-[calc(100vh-64px)] p-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
            <p className="text-gray-600 mb-8 max-w-md">{error}</p>
            <Link href="/dashboard">
              <Button className="bg-black hover:bg-gray-800 text-white rounded-xl px-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  if (!formData) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Edit Bin</h1>
          <p className="text-xl text-gray-600">Make changes to your bin and save them</p>
        </motion.div>

        {error && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Alert variant="destructive" className="mb-6 rounded-xl">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {success && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Settings Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <Card className="shadow-lg border-0 rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="w-5 h-5" />
                  Bin Settings
                </CardTitle>
                <CardDescription>Configure your bin's properties</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-700 font-medium">
                    Title (Optional)
                  </Label>
                  <Input
                    id="title"
                    placeholder="My awesome code snippet"
                    className="h-11 rounded-xl border-gray-200"
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language" className="text-gray-700 font-medium">
                    Language
                  </Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData({ ...formData, language: value })}
                  >
                    <SelectTrigger className="h-11 rounded-xl border-gray-200">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="select-content">
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          <div className="flex items-center space-x-2">
                            <span>{lang.icon}</span>
                            <span>{lang.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700 font-medium">
                    Description (Optional)
                  </Label>
                  <Input
                    id="description"
                    placeholder="Brief description of your bin"
                    className="h-11 rounded-xl border-gray-200"
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {formData.isPrivate ? (
                        <EyeOff className="w-4 h-4 text-gray-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-600" />
                      )}
                      <Label htmlFor="private" className="text-gray-700 font-medium">
                        {formData.isPrivate ? "Private" : "Public"}
                      </Label>
                    </div>
                    <Switch
                      id="private"
                      checked={formData.isPrivate}
                      onCheckedChange={(checked) => setFormData({ ...formData, isPrivate: checked })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center space-x-2 text-gray-700 font-medium">
                      <Lock className="w-4 h-4" />
                      <span>Password Protection {formData.hasPassword ? "(Change)" : "(Optional)"}</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={
                          formData.hasPassword
                            ? "Change password (leave empty to keep current)"
                            : "Set a password to protect this bin"
                        }
                        className="h-11 rounded-xl border-gray-200 pr-12"
                        value={passwordChanged ? newPassword : ""}
                        onChange={handlePasswordChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-9 w-9 rounded-lg"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {formData.hasPassword && !passwordChanged && (
                      <p className="text-xs text-gray-500 mt-1">
                        This bin is currently password protected. Enter a new password to change it or leave empty to
                        keep the current password.
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="h-12 bg-black hover:bg-gray-800 text-white rounded-xl font-medium"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>

                  <Button
                    onClick={handleDelete}
                    disabled={deleting}
                    variant="outline"
                    className="h-12 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 rounded-xl font-medium"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {deleting ? "Deleting..." : "Delete Bin"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Editor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-800 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">
                      {formData.title || "untitled"}.
                      {LANGUAGES.find((l) => l.value === formData.language)?.value || "txt"}
                    </span>
                  </div>
                  <Badge variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                    {LANGUAGES.find((l) => l.value === formData.language)?.label || "Plain Text"}
                  </Badge>
                </div>
              </CardHeader>
              <div className="h-[600px] w-full relative">
                {editorLoading && (
                  <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
                    <div className="text-white text-center">
                      <Code className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                      <p>Loading editor...</p>
                    </div>
                  </div>
                )}
                <Editor
                  height="100%"
                  language={getMonacoLanguage(formData.language)}
                  value={formData.content}
                  theme="vs-dark"
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 20, bottom: 20 },
                    fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
                    lineHeight: 1.6,
                    letterSpacing: 0.5,
                    renderWhitespace: "selection",
                    bracketPairColorization: { enabled: true },
                    guides: {
                      bracketPairs: true,
                      indentation: true,
                    },
                    suggestOnTriggerCharacters: true,
                    quickSuggestions: true,
                    wordBasedSuggestions: true,
                  }}
                />
              </div>
              <div className="bg-blue-600 text-white px-4 py-1 text-xs flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span>Ln 1, Col 1</span>
                  <span>UTF-8</span>
                  <span className="capitalize">{formData.language}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>CodeBinX Editor</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
