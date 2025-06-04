"use client"

import BinSkeleton from "./BinSkeleton"

export default function BinLoading() {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <BinSkeleton key={i} />
            ))}
        </div>
    )
}
