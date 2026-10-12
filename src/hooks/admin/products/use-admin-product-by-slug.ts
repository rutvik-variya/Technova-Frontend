"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getAdminProductBySlugService } from "@/services/admin-product.service";

export const useAdminProductBySlug = (slug: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.ADMIN_PRODUCTS.DETAIL(slug),
        queryFn: () => getAdminProductBySlugService(slug),
        enabled: Boolean(slug),
    });
};