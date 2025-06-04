import { SiteHeader } from "@/components/header";
import { Button } from "@/components/ui/button";
import {motion} from 'framer-motion'
import { AlertCircle, ArrowLeft, Link } from "lucide-react";

export const ErrorState = ({ message }: { message: string }) => (
    <div className="min-h-screen bg-gray-50">
        <SiteHeader />
        <div className="flex items-center justify-center h-[calc(100vh-64px)] p-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
                <p className="text-gray-600 mb-8 max-w-md">{message}</p>
                <Link href="/dashboard">
                    <Button className="bg-black hover:bg-gray-800 text-white rounded-xl px-6">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                    </Button>
                </Link>
            </motion.div>
        </div>
    </div>
)
  