"use client"

import { QUERY_KEYS } from "@/constants/query-keys"
import { getProducts } from "@/services/product.service"
import { ProductQueryParams } from "@/types/product-query"
import { useQuery } from "@tanstack/react-query"

export const useProducts = (
    params: ProductQueryParams
) => {
    return useQuery({
        queryKey: QUERY_KEYS.PRODUCTS.LIST(params),
        queryFn: () => getProducts(params)
    })
}