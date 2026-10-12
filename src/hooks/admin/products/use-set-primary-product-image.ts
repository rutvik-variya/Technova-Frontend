
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { setPrimaryProductImageService } from "@/services/admin-product.service";

interface SetPrimaryImageInput {
    productId: string;
    imageId: string;
}

export const useSetPrimaryProductImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ imageId }: SetPrimaryImageInput) =>
            setPrimaryProductImageService(imageId),

        onSuccess: async (_data, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_PRODUCTS.DETAIL(
                        variables.productId,
                    ),
                }),
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_PRODUCTS.LIST,
                }),
            ]);
        },
    });
};
