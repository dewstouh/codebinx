// app/profile/_components/DangerZone.tsx

"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface DangerZoneProps {
    showDeleteForm: boolean
    setShowDeleteForm: React.Dispatch<React.SetStateAction<boolean>>
    deleteData: { password: string }
    setDeleteData: React.Dispatch<React.SetStateAction<{ password: string }>>
    deleteLoading: boolean
    handleDeleteAccount: (e: React.FormEvent) => Promise<void>
}

export function DangerZone({
    showDeleteForm,
    setShowDeleteForm,
    deleteData,
    setDeleteData,
    deleteLoading,
    handleDeleteAccount,
}: DangerZoneProps) {
    return (
        <Card className="shadow-lg border-red-200">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                    <Trash2 className="h-5 w-5" />
                    Danger Zone
                </CardTitle>
                <CardDescription>
                    Permanently delete your account and all associated data
                </CardDescription>
            </CardHeader>
            <CardContent>
                {!showDeleteForm ? (
                    <div>
                        <p className="text-sm text-gray-600 mb-4">
                            Once you delete your account, there is no going back. This will
                            permanently delete your account and all your bins.
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
                                This action cannot be undone. This will permanently delete your
                                account and remove all your bins from our servers.
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
    )
}
