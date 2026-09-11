"use client";

import { useQuery } from "@tanstack/react-query";

import { getFeaturedProducts } from "@/services/product.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useRelatedProducts = (slug: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.PRODUCTS.RELATED(slug),

        queryFn: () => getFeaturedProducts(),

        enabled: Boolean(slug),

        staleTime: 5 * 60 * 1000,
    });
};