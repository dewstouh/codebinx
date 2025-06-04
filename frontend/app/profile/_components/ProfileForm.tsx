// app/profile/_components/ProfileForm.tsx

"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { User, Mail, Save } from "lucide-react"

interface ProfileFormProps {
    formData: { username: string; email: string }
    setFormData: React.Dispatch<
        React.SetStateAction<{ username: string; email: string }>
    >
    updateLoading: boolean
    handleUpdateProfile: (e: React.FormEvent) => Promise<void>
}

export function ProfileForm({
    formData,
    setFormData,
    updateLoading,
    handleUpdateProfile,
}: ProfileFormProps) {
    return (
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
                                onChange={(e) =>
                                    setFormData({ ...formData, username: e.target.value })
                                }
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
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
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
    )
}
