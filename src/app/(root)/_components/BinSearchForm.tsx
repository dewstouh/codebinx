'use client'

import { Input } from '@/components/ui/input'
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select'
import { ArrowUpDown, Filter, Search } from 'lucide-react'
import { useBinSearchParams } from '@/app/hooks/useBinSearchParams'
import { Language } from '@/types/language'

const sortOptions = [
    { label: 'Newest First', sortBy: 'createdAt', sortDirection: 'desc' },
    { label: 'Oldest First', sortBy: 'createdAt', sortDirection: 'asc' },
    { label: 'Most Viewed', sortBy: 'views', sortDirection: 'desc' },
] as const

export default function BinSearchForm() {

    const {
        title, setTitle,
        sortBy, setSortBy,
        language, setLanguage,
        sortDirection, setSortDirection
    } = useBinSearchParams()

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <form className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Search bins by title, description or content..."
                        className="pl-10 h-12 rounded-xl"
                    />
                </div>

                <div>
                    <Select
                        value={language}
                        onValueChange={(v) => setLanguage(v as Language)}
                    >
                        <SelectTrigger className="h-12 rounded-xl">
                            <div className="flex items-center">
                                <Filter className="w-4 h-4 mr-2 text-gray-500" />
                                <SelectValue placeholder="Language" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Languages</SelectItem>
                            {Object.entries(Language).map(([k, v]) => {
                                return (
                                    <SelectItem value={k}>{v}</SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Select
                        value={`${sortBy}-${sortDirection}`}
                        onValueChange={(v) => {
                            const [sortedBy, sortedDirection] = v.split("-") as [typeof sortBy, typeof sortDirection]
                            setSortBy(sortedBy)
                            setSortDirection(sortedDirection)
                        }}
                    >
                        <SelectTrigger className="h-12 rounded-xl">
                            <div className="flex items-center">
                                <ArrowUpDown className="w-4 h-4 mr-2 text-gray-500" />
                                <SelectValue placeholder="Sort by" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map(opt => (
                                <SelectItem key={`${opt.sortBy}-${opt.sortDirection}`} value={`${opt.sortBy}-${opt.sortDirection}`}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <button type="submit" className="hidden" />
            </form>
        </div>
    )
}
