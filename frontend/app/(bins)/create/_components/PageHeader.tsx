"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

export const PageHeader = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Create a new bin</h1>
        <p className="text-xl text-gray-600">
            Share your code with beautiful syntax highlighting and powerful features
        </p>
    </motion.div>
)
