import BinCard from '@/app/components/BinCard'
import MotionWrapper from '@/app/components/MotionWrapper'
import { Button } from '@/app/components/ui/button'
import { Code } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { BinWithRelations } from '@codebinx/schemas'

interface PageProps {
    binResponsePromise: Promise<BinWithRelations[]>;
}

export default async function BinList({ binResponsePromise }: PageProps) {

    const bins = await binResponsePromise;

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
            {bins && bins.length > 0 ? bins.map((bin, index) => (
                <MotionWrapper
                    key={bin.binId}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                >
                    <BinCard bin={bin} />
                </MotionWrapper>
            ))
                : <div className="col-span-3 text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <Code className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                        No bins found
                    </h3>
                    <p className="text-gray-600 mb-6">Be the first to share a bin!</p>
                    <Link href="/bins/create">
                        <Button className="bg-black hover:bg-gray-800 text-white rounded-xl">
                            Create a Bin
                        </Button>
                    </Link>
                </div>


            }
        </div>
    )
}
