// hooks/useBinListActions.ts
import { useState, useEffect } from "react"
import { IBinResponse as Bin } from "@codebinx/shared"

export function useBinListActions() {
    const [bins, setBins] = useState<Bin[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [totalPages, setTotalPages] = useState(1)

    const [language, setLanguage] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("newest")
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchBins()
    }, [page, language, sortBy])

    const fetchBins = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                public: "true",
                page: page.toString(),
                limit: "12",
            })

            if (language !== "all") params.append("language", language)
            if (searchTerm) params.append("search", searchTerm)

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bins?${params}`)
            if (!res.ok) throw new Error("Failed to fetch bins")

            const data = await res.json()
            setBins(data.bins)
            setTotalPages(Math.ceil(data.total / 12))
        } catch (err) {
            setError("Failed to load bins. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setPage(1)
        fetchBins()
    }

    return {
        bins,
        loading,
        error,
        totalPages,
        fetchBins,
        handleSearch,
        searchTerm,
        setSearchTerm,
        language,
        setLanguage,
        sortBy,
        setSortBy,
        page,
        setPage,
    }
}
