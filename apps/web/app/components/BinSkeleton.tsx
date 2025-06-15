import MotionWrapper from '@/app/components/MotionWrapper'
import React from 'react'

export default function BinSkeleton() {
  return (
        [...Array(5)].map((_, i) => (
            <MotionWrapper
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-64 animate-pulse animate-accordion-up"
            >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="h-24 bg-gray-100 rounded mb-4"></div>
                <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
            </MotionWrapper>
        ))
    )
}
