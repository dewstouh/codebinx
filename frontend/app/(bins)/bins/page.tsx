// app/bins/page.tsx
"use client"

import { SiteHeader } from "@/components/header"
import { useBinListActions } from "./_hooks/useBinListActions"
import BinSearchFilters from "./_components/BinSearchFilters"
import BinSkeleton from "./_components/BinSkeleton"
import BinError from "./_components/BinError"
import BinEmpty from "./_components/BinEmpty"
import BinGrid from "./_components/BinGrid"
import BinPagination from "./_components/BinPagination"

export default function BinsPage() {
  const {
    bins,
    loading,
    error,
    page,
    totalPages,
    searchTerm,
    language,
    sortBy,
    setPage,
    setSearchTerm,
    setLanguage,
    setSortBy,
    handleSearch,
    fetchBins:refetch
  } = useBinListActions()

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <BinSearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          language={language}
          setLanguage={setLanguage}
          sortBy={sortBy}
          setSortBy={setSortBy}
          handleSearch={handleSearch}
        />

        {loading ? (
          <BinSkeleton />
        ) : error ? (
          <BinError error={"Couldn't load the bins"} onRetry={refetch}  />
        ) : bins.length === 0 ? (
          <BinEmpty searchTerm={searchTerm} language={language} />
        ) : (
          <>
            <BinGrid bins={bins} />
            {totalPages > 1 && (
              <BinPagination page={page} totalPages={totalPages} setPage={setPage} />
            )}
          </>
        )}
      </div>
    </div>
  )
}
