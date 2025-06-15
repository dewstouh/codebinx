import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import MotionWrapper from "@/app/components/MotionWrapper"

export function CTA() {
    return (
        <section className="py-32 px-6 lg:px-8 bg-white">
            <div className="max-w-4xl mx-auto text-center">
                <MotionWrapper
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
                        <Link href="/bins/create">
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full px-8 py-4 text-lg font-medium border-gray-300"
                            >
                                Try Without Account
                            </Button>
                        </Link>
                    </div>
                </MotionWrapper>
            </div>
        </section>
    )
}
