// app/_components/CTASection.tsx

"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
    return (
        <section className="py-32 px-6 lg:px-8 bg-white">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Ready to start sharing?
                    </h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        Join thousands of developers who trust CodeBinX for their code sharing needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register">
                            <Button
                                size="lg"
                                className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-4 text-lg font-medium"
                            >
                                Create Free Account
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/create">
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full px-8 py-4 text-lg font-medium border-gray-300"
                            >
                                Try Without Account
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
