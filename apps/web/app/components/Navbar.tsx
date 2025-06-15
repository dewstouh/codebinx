"use client";

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react';
import { Code, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { SignedIn } from '@clerk/nextjs';

const Navbar = ({ showGradient = false }) => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const headerClass = showGradient
        ? "sticky md:fixed top-0 left-0 right-0 z-9 bg-white/80 backdrop-blur-xl border-b border-gray-100"
        : `bg-white border-b border-gray-200 sticky top-0 z-40 ${isScrolled ? "shadow-sm" : ""}`

    return (
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
                            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Code className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-semibold text-gray-900">CodeBinX</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/bins" className="text-gray-600 hover:text-gray-900 transition-colors">
                                Browse
                            </Link>

                            <Link href="/plans" className="text-gray-600 hover:text-gray-900 transition-colors">
                                Plans
                            </Link>

                            <SignedOut>
                                <Link href="/">
                                    <SignInButton>
                                        <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-6">
                                            Sign In
                                        </Button>
                                    </SignInButton>
                                </Link>

                                <Link href="/bins/create">
                                    <Button variant="outline" className="border-gray-300 hover:bg-gray-100 rounded-full px-6">
                                        Create Bin
                                    </Button>
                                </Link>
                            </SignedOut>

                            
                            

                            <SignedIn>
                                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    Dashboard
                                </Link>

                                <Link href="/bins/create">
                                    <Button variant="outline" className="border-gray-300 hover:bg-gray-100 rounded-full px-6">
                                        Create Bin
                                    </Button>
                                </Link>

                                <UserButton />
                                <LogOut />
                            </SignedIn>
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
    )
}

export default Navbar