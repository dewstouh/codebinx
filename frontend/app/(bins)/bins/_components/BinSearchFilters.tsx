"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Filter, Search, ArrowUpDown } from "lucide-react"
import React from "react"
import { languages } from "@codebinx/shared"

interface BinSearchFiltersProps {
    searchTerm: string
    setSearchTerm: (val: string) => void
    language: string
    setLanguage: (val: string) => void
    sortBy: string
    setSortBy: (val: string) => void
    handleSearch: (e: React.FormEvent) => void
}

export default function BinSearchFilters({
    searchTerm,
    setSearchTerm,
    language,
    setLanguage,
    sortBy,
    setSortBy,
    handleSearch,
}: BinSearchFiltersProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <form onSubmit={handleSearch} className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search bins by title, description or content..."
                        className="pl-10 h-12 rounded-xl"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div>
                    <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="h-12 rounded-xl">
                            <div className="flex items-center">
                                <Filter className="w-4 h-4 mr-2 text-gray-500" />
                                <SelectValue placeholder="Language" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Languages</SelectItem>
                            {Object.values(languages).map((vLang) => {
                                return (
                                    <SelectItem key={vLang} value={vLang}>
                                        {vLang}
                                  </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="h-12 rounded-xl">
                            <div className="flex items-center">
                                <ArrowUpDown className="w-4 h-4 mr-2 text-gray-500" />
                                <SelectValue placeholder="Sort by" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="oldest">Oldest First</SelectItem>
                            <SelectItem value="views">Most Viewed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </form>
        </div>
    )
}
