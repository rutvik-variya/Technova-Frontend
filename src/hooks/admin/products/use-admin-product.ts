
"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getAdminProductByIdService } from "@/services/admin-product.service";

export const useAdminProduct = (id: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.ADMIN_PRODUCTS.DETAIL(id),
        queryFn: () => getAdminProductByIdService(id),
        enabled: Boolean(id),
    });
};