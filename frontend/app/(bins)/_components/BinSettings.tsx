"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Lock, Save, Trash2, Settings } from "lucide-react"
import { languages } from "@codebinx/shared"

interface Props {
    formData: any
    setFormData: any
    onSubmit: (e: React.FormEvent) => Promise<void>
    loading: boolean
    submitLabel?: string
    showPassword?: boolean
    setShowPassword?: (val: boolean) => void
    passwordChanged?: boolean
    setPasswordChanged?: (val: boolean) => void
    newPassword?: string
    setNewPassword?: (val: string) => void
    showDelete?: boolean
    onDelete?: () => void
    deleteLoading?: boolean
}

export const BinSettings = ({
    formData,
    setFormData,
    onSubmit,
    loading,
    submitLabel = "Create Bin",
    showPassword = false,
    setShowPassword = () => { },
    passwordChanged = false,
    setPasswordChanged = () => { },
    newPassword = "",
    setNewPassword = () => { },
    showDelete = false,
    onDelete = () => { },
    deleteLoading = false,
}: Props) => {
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordChanged(true)
        setNewPassword(e.target.value)
    }
    return (
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
                    <Label htmlFor="title">Title (Optional)</Label>
                    <Input
                        id="title"
                        placeholder="My awesome code snippet"
                        value={formData.title || ""}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                        value={formData.language}
                        onValueChange={(value) => setFormData({ ...formData, language: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(languages).map(([key]) => (
                                <SelectItem key={key} value={key}>{key}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Input
                        id="description"
                        placeholder="Brief description of your bin"
                        value={formData.description || ""}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {formData.isPrivate ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            <Label htmlFor="private">{formData.isPrivate ? "Private" : "Public"}</Label>
                        </div>
                        <Switch
                            id="private"
                            checked={formData.isPrivate}
                            onCheckedChange={(checked) => setFormData({ ...formData, isPrivate: checked })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="flex items-center space-x-2">
                            <Lock className="w-4 h-4" />
                            <span>Password {formData.hasPassword ? "(Change)" : "(Optional)"}</span>
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
                                className="pr-12"
                                value={formData.password}
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
                                This bin is password protected. Leave empty to keep the current one.
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Button
                        onClick={onSubmit}
                        disabled={loading || !formData.content?.trim()}
                        className="h-12 bg-black hover:bg-gray-800 text-white rounded-xl font-medium"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? "Saving..." : submitLabel}
                    </Button>

                    {showDelete && (
                        <Button
                            onClick={onDelete}
                            disabled={deleteLoading}
                            variant="outline"
                            className="h-12 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 rounded-xl font-medium"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {deleteLoading ? "Deleting..." : "Delete Bin"}
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
