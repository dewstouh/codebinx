import SearchForm from '@/app/(root)/_components/BinSearchForm'
import StatCard from '@/app/(root)/dashboard/_components/StatCard'
import { getBins } from '@/app/actions/bin.actions'
import BinList from '@/app/components/BinList'
import { Calendar, Eye, Plus, Search, TrendingUp } from 'lucide-react'
import { SearchParams } from 'nuqs'
import React from 'react'

export default async function page({searchParams}:{searchParams: Promise<SearchParams>}) {

    const params = await searchParams;

    const bins = getBins(params)

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Dashboard Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                    <p className="text-gray-600">Manage your code bins and track their performance</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatCard title='Total Bins' value={23} icon={<Plus className="w-4 h-4 text-blue-600" />} />
                    <StatCard title='Total Views' value={50} icon={<Eye className="w-4 h-4 text-green-600" />} />
                    <StatCard title='Public Bins' value={12} icon={<TrendingUp className="w-4 h-4 text-purple-600" />} />
                    <StatCard title='Private Bins' value={12} icon={<Calendar className="w-4 h-4 text-orange-600" />} />
                </div>

                {/* Controls */}
                <SearchForm />

                {/* Bins Grid */}
                <BinList binResponsePromise={bins}/>
            </div>
        </div>
    )
}
