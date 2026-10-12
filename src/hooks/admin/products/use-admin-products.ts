
"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getAdminProductsService } from "@/services/admin-product.service";

interface AdminProductParams {
    page?: number;
    limit?: number;
}

export const useAdminProducts = ({
    page = 1,
    limit = 10,
}: AdminProductParams = {}) => {
    return useQuery({
        queryKey: [...QUERY_KEYS.ADMIN_PRODUCTS.LIST, page, limit],
        queryFn: () => getAdminProductsService(page, limit),
    });
};
