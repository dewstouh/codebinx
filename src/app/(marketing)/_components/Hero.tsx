import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Demo } from "@/app/(marketing)/_components/Demo";
import MotionWrapper from "@/components/MotionWrapper";

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

export function Hero() {

    return (
        <section className="min-h-screen flex items-center justify-center pt-16 md:pt-32 pb-20 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Lado izquierdo: texto y botones */}
                    <MotionWrapper
                        className="text-center lg:text-left"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                    >
                        <MotionWrapper variants={fadeInUp} className="mb-8">
                            <Badge
                                variant="secondary"
                                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                            >
                                The future of code sharing
                            </Badge>
                        </MotionWrapper>

                        <MotionWrapper
                            type="h1"
                            variants={fadeInUp}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
                        >
                            Share code like
                            <br />
                            <span className="bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                                never before
                            </span>
                        </MotionWrapper>

                        <div className="text-wrap mx-auto">
                            <MotionWrapper
                                type={"p"}
                                variants={fadeInUp}
                                className="text-xl text-gray-600 mb-12 leading-relaxed mx-auto"
                            >
                                CodeBinX is the modern way to share, store, and collaborate on code
                                snippets. Beautiful, fast, and secure.
                            </MotionWrapper>
                        </div>

                        <MotionWrapper
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Link href="/bins/create">
                                <Button
                                    size="lg"
                                    className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-medium"
                                >
                                    Start Creating
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/bins">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="px-8 py-4 text-lg font-medium border-gray-300"
                                >
                                    Browse Bins
                                </Button>
                            </Link>
                        </MotionWrapper>
                    </MotionWrapper>

                    <MotionWrapper
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl p-4 border border-gray-100">
                            <Demo />
                        </div>
                    </MotionWrapper>
                </div>
            </div>
        </section>
    )
}
