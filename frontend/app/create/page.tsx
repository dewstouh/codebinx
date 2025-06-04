"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SiteHeader } from "@/components/header"
import { Code, Eye, EyeOff, Lock, AlertCircle, CheckCircle, ArrowLeft, Settings } from "lucide-react"

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

export default function CreateBinPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    description: "",
    language: "javascript",
    isPrivate: false,
    password: "",
    expiresIn: "30",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState<{ binId: string } | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [editorLoading, setEditorLoading] = useState(true)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("token")
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      }

      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bins`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          title: formData.title || "Untitled Bin",
          content: formData.content,
          description: formData.description,
          language: formData.language,
          isPrivate: formData.isPrivate,
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
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleEditorChange = (value: string | undefined) => {
    setFormData((prev) => ({ ...prev, content: value || "" }))
  }

  const handleEditorDidMount = () => {
    setEditorLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
          <Card className="shadow-xl border-0 rounded-3xl overflow-hidden">
            <CardHeader className="text-center bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl font-bold">Bin Created!</CardTitle>
              <CardDescription className="text-green-100">Your bin is ready to share with the world</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <p className="text-sm text-gray-600 mb-2">Your bin URL:</p>
                <code className="text-blue-600 font-mono text-sm break-all bg-white p-2 rounded border">
                  {window.location.origin}/bin/{success.binId}
                </code>
              </div>
              <div className="flex gap-3">
                <Link href={`/bin/${success.binId}`} className="flex-1">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-xl">View Bin</Button>
                </Link>
                <Link href="/create" className="flex-1">
                  <Button variant="outline" className="w-full rounded-xl">
                    Create Another
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Create a new bin</h1>
          <p className="text-xl text-gray-600">
            Share your code with beautiful syntax highlighting and powerful features
          </p>
        </motion.div>

        {error && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Alert variant="destructive" className="mb-6 rounded-xl">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
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
                    value={formData.title}
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
                    value={formData.description}
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
                      <span>Password Protection (Optional)</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Set a password to protect this bin"
                        className="h-11 rounded-xl border-gray-200 pr-12"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expires" className="text-gray-700 font-medium">
                      Expires In
                    </Label>
                    <Select
                      value={formData.expiresIn}
                      onValueChange={(value) => setFormData({ ...formData, expiresIn: value })}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="select-content">
                        <SelectItem value="1">1 Day</SelectItem>
                        <SelectItem value="7">1 Week</SelectItem>
                        <SelectItem value="30">1 Month</SelectItem>
                        <SelectItem value="90">3 Months</SelectItem>
                        <SelectItem value="365">1 Year</SelectItem>
                        <SelectItem value="0">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={loading || !formData.content.trim()}
                  className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-xl font-medium"
                >
                  {loading ? "Creating..." : "Create Bin"}
                </Button>
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
