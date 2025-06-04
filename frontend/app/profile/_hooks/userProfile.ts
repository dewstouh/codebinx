// hooks/useProfile.ts

"use client"

import { useState, useEffect } from "react"
import { useApi } from "@/hooks/useApi"
import { UserType } from "@/types/user"

interface FormData {
    username: string
    email: string
}

interface DeleteData {
    password: string
}

interface UseProfileReturn {
    user: UserType | null
    formData: FormData
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
    deleteData: DeleteData
    setDeleteData: React.Dispatch<React.SetStateAction<DeleteData>>
    loading: boolean
    updateLoading: boolean
    deleteLoading: boolean
    error: string
    success: string
    showDeleteForm: boolean
    setShowDeleteForm: React.Dispatch<React.SetStateAction<boolean>>
    handleUpdateProfile: (e: React.FormEvent) => Promise<void>
    handleDeleteAccount: (e: React.FormEvent) => Promise<void>
}

export function useProfile(): UseProfileReturn {
    const [user, setUser] = useState<UserType | null>(null)
    const [formData, setFormData] = useState<FormData>({ username: "", email: "" })
    const [deleteData, setDeleteData] = useState<DeleteData>({ password: "" })
    const [showDeleteForm, setShowDeleteForm] = useState(false)

    const [success, setSuccess] = useState("")

    const {
        data: userData,
        error: fetchError,
        loading: fetchLoading,
        request: fetchRequest,
    } = useApi<{ user: UserType }>()

    const {
        data: updateData,
        error: updateError,
        loading: updateLoading,
        request: updateRequest,
    } = useApi<{ user: UserType; message?: string }>()

    const {
        data: deleteResp,
        error: deleteError,
        loading: deleteLoading,
        request: deleteRequest,
    } = useApi<unknown>()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            window.location.href = "/login"
            return
        }
        fetchRequest(
            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/auth/profile`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
    }, [])

    useEffect(() => {
        if (userData?.user) {
            setUser(userData.user)
            setFormData({
                username: userData.user.username,
                email: userData.user.email,
            })
        }
    }, [userData])

    const error = fetchError || updateError || deleteError || ""

    useEffect(() => {
        if (updateData && updateData.user) {
            setUser(updateData.user)
            setSuccess("Profile updated successfully!")
        }
    }, [updateData])

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        setSuccess("") 
        const token = localStorage.getItem("token")
        if (!token) {
            setSuccess("") 
            return
        }

        await updateRequest(
            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/users/profile`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            }
        )
    }

    const handleDeleteAccount = async (e: React.FormEvent) => {
        e.preventDefault()

        if (
            !confirm(
                "Are you sure you want to delete your account? This action cannot be undone and will delete all your bins."
            )
        ) {
            return
        }

        const token = localStorage.getItem("token")
        if (!token) {
            return
        }

        await deleteRequest(
            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/users/account`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(deleteData),
            }
        )

        if (!deleteError) {
            localStorage.removeItem("token")
            alert("Account deleted successfully")
            window.location.href = "/"
        }
    }

    return {
        user,
        formData,
        setFormData,
        deleteData,
        setDeleteData,
        loading: fetchLoading,
        updateLoading,
        deleteLoading,
        error,
        success,
        showDeleteForm,
        setShowDeleteForm,
        handleUpdateProfile,
        handleDeleteAccount,
    }
}
