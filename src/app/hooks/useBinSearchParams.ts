"use client";

import { useSafeQueryStateFromZod } from '@/app/hooks/useSafeQueryStateFromZod';
import { binParamsFields } from '@/zod/getBinParams'

export const useBinSearchParams = () => {
    const [page, setPage] = useSafeQueryStateFromZod('page', binParamsFields.page)
    const [limit, setLimit] = useSafeQueryStateFromZod('limit', binParamsFields.limit)
    const [title, setTitle] = useSafeQueryStateFromZod('title', binParamsFields.title, {delay: 500, shallow: false})
    const [language, setLanguage] = useSafeQueryStateFromZod('language', binParamsFields.language, { shallow: false })
    const [sortBy, setSortBy] = useSafeQueryStateFromZod('sortBy', binParamsFields.sortBy, { shallow: false })
    const [sortDirection, setSortDirection] = useSafeQueryStateFromZod('sortDirection', binParamsFields.sortDirection, { shallow: false })

    return {
        page, setPage,
        limit, setLimit,
        title, setTitle,
        language, setLanguage,
        sortBy, setSortBy,
        sortDirection, setSortDirection,
    }
}
