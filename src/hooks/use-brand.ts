"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getBrands } from "@/services/product.service";

export const useBrands = () => {
    return useQuery({
        queryKey: QUERY_KEYS.PRODUCTS.BRANDS,
        queryFn: getBrands,
    });
};