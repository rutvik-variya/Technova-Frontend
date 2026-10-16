
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { updateCategoryService } from "@/services/category.service";
import type { UpdateCategoryPayload } from "@/types/category";

interface UpdateCategoryVariables {
    id: string;
    payload: UpdateCategoryPayload;
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: UpdateCategoryVariables) =>
            updateCategoryService(id, payload),

        onSuccess: async (_response, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.CATEGORIES.ALL,
                }),
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.CATEGORIES.DETAIL(variables.id),
                }),
            ]);
        },
    });
};
