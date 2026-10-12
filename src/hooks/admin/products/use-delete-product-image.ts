
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { deleteProductImageService } from "@/services/admin-product.service";

interface DeleteProductImageInput {
    productId: string;
    imageId: string;
}

export const useDeleteProductImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ imageId }: DeleteProductImageInput) =>
            deleteProductImageService(imageId),

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
