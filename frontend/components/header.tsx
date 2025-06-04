"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Code, User, LogOut, Menu, X } from "lucide-react"
import { isAuthenticated, removeAuthToken } from "@/lib/auth"

interface SiteHeaderProps {
    showGradient?: boolean
}

export function SiteHeader({ showGradient = false }: SiteHeaderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState("")
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            const loggedIn = isAuthenticated()
            setIsLoggedIn(loggedIn)

            if (loggedIn) {
                try {
                    const token = localStorage.getItem("token")
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/auth/profile`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    )

                    if (response.ok) {
                        const data = await response.json()
                        setUsername(data.user.username)
                    }
                } catch (err) {
                    console.error("Failed to fetch user data")
                }
            }
        }

        checkAuth()

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleLogout = () => {
        removeAuthToken()
        setIsMobileMenuOpen(false)
        window.location.href = "/"
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const headerClass = showGradient
        ? "fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100"
        : `bg-white border-b border-gray-200 sticky top-0 z-40 ${isScrolled ? "shadow-sm" : ""}`

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={headerClass}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-3" onClick={closeMobileMenu}>
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Code className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-semibold text-gray-900">CodeBinX</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/bins" className="text-gray-600 hover:text-gray-900 transition-colors">
                                Browse
                            </Link>
                            {isLoggedIn ? (
                                <>
                                    <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                                        Dashboard
                                    </Link>
                                    <div className="flex items-center space-x-4">
                                        <Link href="/profile" className="flex items-center text-gray-600 hover:text-gray-900">
                                            <User className="w-4 h-4 mr-2" />
                                            {username || "Profile"}
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleLogout}
                                            className="text-gray-600 hover:text-red-600"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Logout
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                                        Sign In
                                    </Link>
                                    <Link href="/register">
                                        <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-6">Sign Up</Button>
                                    </Link>
                                </>
                            )}
                            <Link href="/create">
                                <Button variant="outline" className="border-gray-300 hover:bg-gray-100 rounded-full px-6">
                                    Create Bin
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                            onClick={closeMobileMenu}
                        />

                        {/* Mobile Menu */}
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 md:hidden"
                        >
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                            <Code className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-xl font-semibold text-gray-900">CodeBinX</span>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={closeMobileMenu} className="p-2">
                                        <X className="h-6 w-6" />
                                    </Button>
                                </div>

                                {/* Navigation Links */}
                                <div className="flex-1 py-6">
                                    <nav className="space-y-1 px-6">
                                        <Link
                                            href="/bins"
                                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                            onClick={closeMobileMenu}
                                        >
                                            Browse Bins
                                        </Link>

                                        {isLoggedIn ? (
                                            <>
                                                <Link
                                                    href="/dashboard"
                                                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                                    onClick={closeMobileMenu}
                                                >
                                                    Dashboard
                                                </Link>
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                                    onClick={closeMobileMenu}
                                                >
                                                    <User className="w-5 h-5 mr-3" />
                                                    {username || "Profile"}
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href="/login"
                                                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                                    onClick={closeMobileMenu}
                                                >
                                                    Sign In
                                                </Link>
                                                <Link
                                                    href="/register"
                                                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                                    onClick={closeMobileMenu}
                                                >
                                                    Sign Up
                                                </Link>
                                            </>
                                        )}

                                        <Link
                                            href="/create"
                                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                            onClick={closeMobileMenu}
                                        >
                                            Create Bin
                                        </Link>
                                    </nav>
                                </div>

                                {/* Footer Actions */}
                                <div className="border-t border-gray-200 p-6">
                                    {isLoggedIn ? (
                                        <Button
                                            variant="outline"
                                            onClick={handleLogout}
                                            className="w-full justify-center text-red-600 border-red-200 hover:bg-red-50"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Logout
                                        </Button>
                                    ) : (
                                        <div className="space-y-3">
                                            <Link href="/register" onClick={closeMobileMenu}>
                                                <Button className="w-full bg-black hover:bg-gray-800 text-white">Get Started</Button>
                                            </Link>
                                            <Link href="/login" onClick={closeMobileMenu}>
                                                <Button variant="outline" className="w-full">
                                                    Sign In
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
