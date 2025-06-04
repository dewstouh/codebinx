// components/bin/BinGrid.tsx
import { motion } from "framer-motion"
import BinCard from "./BinCard"
import { IBinResponse as Bin } from "@codebinx/shared"
import Link from "next/link"

interface BinGridProps {
    bins: Bin[]
}

export default function BinGrid({ bins }: BinGridProps) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bins.map((bin, index) => (
                <motion.div
                    key={bin.binId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                >
                    <Link href={`/bin/${bin.binId}`}>
                        <BinCard bin={bin} />
                    </Link>
                </motion.div>
            ))}
        </div>
    )
}
