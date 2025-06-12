import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import MotionWrapper from "@/components/MotionWrapper"
import { Suspense } from "react"
import BinSkeleton from "@/app/components/BinSkeleton"
import BinList from "@/app/components/BinList"
import { getBins } from "@/app/actions/bin.actions"


export async function LatestBinsSection() {

    const bins = getBins();

    return (
        <section className="min-h-screen flex items-center justify-center py-20 px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto w-full">
                <MotionWrapper
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Latest Public Bins
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Check out what the community is sharing right now
                    </p>
                </MotionWrapper>

                <MotionWrapper
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Suspense fallback={<BinSkeleton />}>
                        <BinList binResponsePromise={bins} />
                    </Suspense>


                </MotionWrapper>

                <MotionWrapper
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link href="/bins">
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-8 py-4 text-lg font-medium border-gray-300"
                        >
                            Browse All Bins
                            <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </MotionWrapper>
            </div>
        </section>
    )
}
