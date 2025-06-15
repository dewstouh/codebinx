"use client"

import Link from "next/link"
import { Code } from "lucide-react"
import project from "@/config/project"

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-16 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Code className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-semibold">{project.name}</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            {project.shortDescription}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li>
                                <Link href="/bins/create" className="hover:text-white transition-colors">
                                    Create Bin
                                </Link>
                            </li>
                            <li>
                                <Link href="/bins" className="hover:text-white transition-colors">
                                    Browse Bins
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="hover:text-white transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Account</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li>
                                <Link href="/login" className="hover:text-white transition-colors">
                                    Sign In
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="hover:text-white transition-colors">
                                    Sign Up
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile" className="hover:text-white transition-colors">
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li>
                                <Link href="/help" className="hover:text-white transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/api" className="hover:text-white transition-colors">
                                    API Docs
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 {project.name}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
