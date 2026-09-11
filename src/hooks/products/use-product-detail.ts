"use client"

import { QUERY_KEYS } from "@/constants/query-keys"
import { getProductBySlug } from "@/services/product.service"
import { useQuery } from "@tanstack/react-query"

export const useProductDetails = (slug: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.PRODUCTS.DETAIL(slug),
        queryFn: () => getProductBySlug(slug),
        enabled: Boolean(slug)
    })
}