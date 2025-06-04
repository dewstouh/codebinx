"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export const SuccessCard = ({ binId }: { binId: string }) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
            <Card className="shadow-xl border-0 rounded-3xl overflow-hidden">
                <CardHeader className="text-center bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Bin Created!</CardTitle>
                    <CardDescription className="text-green-100">Your bin is ready to share with the world</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="bg-gray-50 p-4 rounded-xl mb-6">
                        <p className="text-sm text-gray-600 mb-2">Your bin URL:</p>
                        <code className="text-blue-600 font-mono text-sm break-all bg-white p-2 rounded border">
                            {typeof window !== "undefined" && `${window.location.origin}/bin/${binId}`}
                        </code>
                    </div>
                    <div className="flex gap-3">
                        <Link href={`/bin/${binId}`} className="flex-1">
                            <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-xl">View Bin</Button>
                        </Link>
                        <Link href="/create" className="flex-1">
                            <Button variant="outline" className="w-full rounded-xl">Create Another</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    </div>
)
