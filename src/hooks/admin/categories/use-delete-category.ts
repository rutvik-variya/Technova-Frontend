
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { deleteCategoryService } from "@/services/category.service";

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteCategoryService(id),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.CATEGORIES.ALL,
            });
        },
    });
};
