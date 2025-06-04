// app/_components/HeroSection.tsx

"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code } from "lucide-react"
import { DemoSection } from "./DemoSection"  // <-- Importa correctamente

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeInOut" },
    },
}
const staggerContainer = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
  }
export function HeroSection() {
    return (
        <section className="min-h-screen flex items-center justify-center pt-32 pb-20 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Lado izquierdo: texto y botones */}
                    <motion.div
                        className="text-center lg:text-left"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div variants={fadeInUp} className="mb-8">
                            <Badge
                                variant="secondary"
                                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                            >
                                The future of code sharing
                            </Badge>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
                        >
                            Share code like
                            <br />
                            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                                never before
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-xl text-gray-600 mb-12 leading-relaxed"
                        >
                            CodeBinX is the modern way to share, store, and collaborate on code
                            snippets. Beautiful, fast, and secure.
                        </motion.p>

                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Link href="/create">
                                <Button
                                    size="lg"
                                    className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-4 text-lg font-medium"
                                >
                                    Start Creating
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/bins">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="rounded-full px-8 py-4 text-lg font-medium border-gray-300"
                                >
                                    Browse Bins
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Lado derecho: DemoSection */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Contenedor del demo: ahora sí incluimos <DemoSection /> */}
                        <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
                            <DemoSection />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
