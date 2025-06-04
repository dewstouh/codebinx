"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SiteHeader } from "@/components/header"
import {
  Code,
  Copy,
  Eye,
  Calendar,
  User,
  Lock,
  AlertCircle,
  CheckCircle,
  Download,
  Share2,
  ArrowLeft,
  Maximize2,
} from "lucide-react"

interface Bin {
  _id: string
  binId: string
  title?: string
  content: string
  description?: string
  language: string
  isPrivate: boolean
  hasPassword: boolean
  views: number
  createdAt: string
  expiresAt?: string
  author?: {
    username: string
  }
}

export default function BinViewPage() {
  const params = useParams()
  const binId = params.binId as string

  const [bin, setBin] = useState<Bin | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [passwordRequired, setPasswordRequired] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [editorLoading, setEditorLoading] = useState(true)

  useEffect(() => {
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
      scala: "scala",
      html: "html",
      css: "css",
      scss: "scss",
      json: "json",
      xml: "xml",
      yaml: "yaml",
      markdown: "markdown",
      sql: "sql",
      bash: "shell",
      powershell: "powershell",
      dockerfile: "dockerfile",
      plaintext: "plaintext",
    }
    return languageMap[lang] || "plaintext"
  }

  const fetchBin = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bins/${binId}`)
      
      if (response.status === 401) {
        if (response) {
          setPasswordRequired(true)
          setLoading(false)
          return;
        }
      }
      
      if (!response.ok) {
        throw new Error("Bin not found")
      }
      
      const data = await response.json()
      console.log(data)
      setBin(data.bin)
    } catch (err) {
      setError("Failed to load bin. It may not exist or may have expired.")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordLoading(true)
    setError("")

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bins/${binId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        throw new Error("Invalid password")
      }

      const data = await response.json()
      setBin(data.bin)
      setPasswordRequired(false)
    } catch (err) {
      setError("Invalid password. Please try again.")
    } finally {
      setPasswordLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (bin) {
      await navigator.clipboard.writeText(bin.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const copyUrl = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadBin = () => {
    if (bin) {
      const element = document.createElement("a")
      const file = new Blob([bin.content], { type: "text/plain" })
      element.href = URL.createObjectURL(file)
      element.download = `${bin.title || bin.binId}.${getFileExtension(bin.language)}`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  }

  const getFileExtension = (language: string): string => {
    const extensions: Record<string, string> = {
      javascript: "js",
      typescript: "ts",
      python: "py",
      java: "java",
      cpp: "cpp",
      c: "c",
      csharp: "cs",
      php: "php",
      ruby: "rb",
      go: "go",
      rust: "rs",
      swift: "swift",
      kotlin: "kt",
      scala: "scala",
      html: "html",
      css: "css",
      scss: "scss",
      json: "json",
      xml: "xml",
      yaml: "yml",
      markdown: "md",
      sql: "sql",
      bash: "sh",
      powershell: "ps1",
      dockerfile: "dockerfile",
    }
    return extensions[language] || "txt"
  }

  const handleEditorDidMount = () => {
    setEditorLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto">
            <Code className="w-8 h-8 animate-pulse" />
          </div>
          <p className="text-gray-600 text-lg">Loading your bin...</p>
        </motion.div>
      </div>
    )
  }

  if (passwordRequired) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card className="shadow-xl border-0 rounded-3xl overflow-hidden">
            <CardHeader className="text-center bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl font-bold">Protected Bin</CardTitle>
              <CardDescription className="text-blue-100">This bin requires a password to view</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter the bin password"
                    className="h-12 rounded-xl border-gray-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-xl font-medium"
                  disabled={passwordLoading}
                >
                  {passwordLoading ? "Verifying..." : "Access Bin"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bin Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md">{error}</p>
          <Link href="/">
            <Button className="bg-black hover:bg-gray-800 text-white rounded-xl px-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  if (!bin) return null

  return (
    <div className={`min-h-screen bg-gray-50 ${isFullscreen ? "fixed inset-0 z-50" : ""}`}>
      {/* Header */}
      {!isFullscreen && <SiteHeader />}

      {/* Main Content */}
      <div className={`${isFullscreen ? "h-screen" : "min-h-screen"} flex flex-col`}>
        {/* Bin Info Bar */}
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-b border-gray-200 px-6 py-4"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>{bin.views} views</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(bin.createdAt).toLocaleDateString()}</span>
                  </div>
                  {bin.author && (
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>by {bin.author.username}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <Badge variant={bin.isPrivate ? "destructive" : "secondary"} className="rounded-lg">
                    {bin.isPrivate ? "Private" : "Public"}
                  </Badge>
                  <Badge variant="outline" className="rounded-lg font-mono">
                    {bin.language}
                  </Badge>
                  {bin.hasPassword && (
                    <Badge variant="outline" className="rounded-lg">
                      <Lock className="w-3 h-3 mr-1" />
                      Protected
                    </Badge>
                  )}
                  <Button variant="outline" size="sm" onClick={copyUrl} className="rounded-lg">
                    {copied ? <CheckCircle className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
                    Share
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadBin} className="rounded-lg">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              {bin.description && <p className="text-gray-600 mt-2">{bin.description}</p>}
            </div>
          </motion.div>
        )}

        {/* Editor Container */}
        <div className="flex-1 relative">
          {/* VS Code-like Tab Bar */}
          <div className="bg-gray-800 border-b border-gray-700">
            <div className="flex items-center">
              <div className="bg-gray-700 px-4 py-2 text-white text-sm font-medium border-r border-gray-600 flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>{bin.title || `${bin.binId}.${getFileExtension(bin.language)}`}</span>
              </div>
              <div className="flex-1"></div>
              <div className="flex items-center space-x-2 px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className={`${isFullscreen ? "h-full" : "h-[calc(100vh-200px)]"} w-full relative`}>
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
              language={getMonacoLanguage(bin.language)}
              value={bin.content}
              theme="vs-dark"
              onMount={handleEditorDidMount}
              options={{
                readOnly: true,
                minimap: { enabled: true },
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
              }}
            />
          </div>

          {/* Status Bar */}
          <div className="bg-blue-600 text-white px-4 py-1 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span>Ln 1, Col 1</span>
              <span>UTF-8</span>
              <span className="capitalize">{bin.language}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Read-only</span>
              <span>CodeBinX</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Fullscreen Exit */}
      {isFullscreen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsFullscreen(false)}
          className="fixed top-4 right-4 z-50 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  )
}
