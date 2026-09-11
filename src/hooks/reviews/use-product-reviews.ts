"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getProductReviews } from "@/services/reviews.service";

export const useProductReviews = (
    productId: string,
    page: number,
    limit: number
) => {
    return useQuery({
        queryKey: [
            ...QUERY_KEYS.REVIEWS.PRODUCT(productId),
            page,
            limit,
        ],

        queryFn: () =>
            getProductReviews(productId, page, limit),

        enabled: Boolean(productId),

        staleTime: 2 * 60 * 1000,
    });
};