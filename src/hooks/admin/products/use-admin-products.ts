
"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getAdminProductsService } from "@/services/admin-product.service";

export const useAdminProducts = () => {
    return useQuery({
        queryKey: QUERY_KEYS.ADMIN_PRODUCTS.LIST,
        queryFn: getAdminProductsService,
    });
};