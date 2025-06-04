"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Code, User, Mail, Save, Trash2, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react"

interface UserType {
  username: string
  email: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserType | null>(null)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  })
  const [deleteData, setDeleteData] = useState({
    password: "",
  })
  const [loading, setLoading] = useState(true)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showDeleteForm, setShowDeleteForm] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.href = "/login"
      return
    }

    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setFormData({
          username: data.user.username,
          email: data.user.email,
        })
      } else {
        setError("Failed to load profile")
      }
    } catch (err) {
      setError("Network error. Please try again.")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdateLoading(true)
    setError("")
    setSuccess("")

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        setSuccess("Profile updated successfully!")
      } else {
        setError(data.message || "Failed to update profile")
      }
    } catch (err) {
      setError("Network error. Please try again.")
      throw err
    } finally {
      setUpdateLoading(false)
    }
  }

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone and will delete all your bins.",
      )
    ) {
      return
    }

    setDeleteLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/users/account`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(deleteData),
      })

      if (response.ok) {
        localStorage.removeItem("token")
        alert("Account deleted successfully")
        window.location.href = "/"
      } else {
        const data = await response.json()
        setError(data.message || "Failed to delete account")
      }
    } catch (err) {
      setError("Network error. Please try again.")
      throw err
    } finally {
      setDeleteLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Code className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">CodeBinX</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            <Link href="/create">
              <Button variant="outline">New Bin</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Back Button */}
        <Link href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {/* Profile Information */}
        <Card className="shadow-lg border-0 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your account details below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="pl-10"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button type="submit" disabled={updateLoading}>
                <Save className="h-4 w-4 mr-2" />
                {updateLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="shadow-lg border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>Permanently delete your account and all associated data</CardDescription>
          </CardHeader>
          <CardContent>
            {!showDeleteForm ? (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Once you delete your account, there is no going back. This will permanently delete your account and
                  all your bins.
                </p>
                <Button variant="destructive" onClick={() => setShowDeleteForm(true)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            ) : (
              <form onSubmit={handleDeleteAccount} className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-800 mb-2">Are you absolutely sure?</h4>
                  <p className="text-sm text-red-700">
                    This action cannot be undone. This will permanently delete your account and remove all your bins
                    from our servers.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delete-password">Enter your password to confirm</Label>
                  <Input
                    id="delete-password"
                    type="password"
                    placeholder="Enter your password"
                    value={deleteData.password}
                    onChange={(e) => setDeleteData({ password: e.target.value })}
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" variant="destructive" disabled={deleteLoading}>
                    {deleteLoading ? "Deleting..." : "I understand, delete my account"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowDeleteForm(false)
                      setDeleteData({ password: "" })
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
