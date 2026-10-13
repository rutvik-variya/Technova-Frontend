
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { createCategoryService } from "@/services/category.service";
import type { CreateCategoryPayload } from "@/types/category";

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateCategoryPayload) =>
            createCategoryService(payload),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.CATEGORIES.ALL,
            });
        },
    });
};
