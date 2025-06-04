import { SiteHeader } from "@/components/header";
import { motion } from "framer-motion"
import { Code } from "lucide-react";

export const LoadingState = () => (
    <div className="min-h-screen bg-gray-50">
        <SiteHeader />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto">
                    <Code className="w-8 h-8 animate-pulse" />
                </div>
                <p className="text-gray-600 text-lg">Loading bin...</p>
            </motion.div>
        </div>
    </div>
  )