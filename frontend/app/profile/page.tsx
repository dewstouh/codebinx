// app/profile/page.tsx

"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { useProfile } from "./_hooks/userProfile"
import { ProfileHeader } from "./_components/ProfileHeader"
import { AlertsContainer } from "./_components/AlertsContainer"
import { ProfileForm } from "./_components/ProfileForm"
import { DangerZone } from "./_components/DangerZone"
import { Loading } from "../_components/Loading"

export default function ProfilePage() {
  const {
    formData,
    setFormData,
    deleteData,
    setDeleteData,
    loading,
    updateLoading,
    deleteLoading,
    error,
    success,
    showDeleteForm,
    setShowDeleteForm,
    handleUpdateProfile,
    handleDeleteAccount,
  } = useProfile()

  if (loading) return <Loading />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <ProfileHeader />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        <AlertsContainer error={error} success={success} />

        <ProfileForm
          formData={formData}
          setFormData={setFormData}
          updateLoading={updateLoading}
          handleUpdateProfile={handleUpdateProfile}
        />

        <DangerZone
          showDeleteForm={showDeleteForm}
          setShowDeleteForm={setShowDeleteForm}
          deleteData={deleteData}
          setDeleteData={setDeleteData}
          deleteLoading={deleteLoading}
          handleDeleteAccount={handleDeleteAccount}
        />
      </div>
    </div>
  )
}
