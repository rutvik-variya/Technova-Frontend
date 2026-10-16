
"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getCategoryById } from "@/services/category.service";

export const useCategory = (id: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.CATEGORIES.DETAIL(id),
        queryFn: () => getCategoryById(id),
        enabled: Boolean(id),
    });
};
