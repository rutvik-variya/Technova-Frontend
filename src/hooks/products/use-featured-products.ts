"use client"

import { QUERY_KEYS } from "@/constants/query-keys"
import { getFeaturedProducts } from "@/services/product.service"
import { useQuery } from "@tanstack/react-query"

export const useFeaturedProducts = () => {
    return useQuery({
        queryKey: QUERY_KEYS.PRODUCTS.FEATURED,
        queryFn: getFeaturedProducts
    })
}