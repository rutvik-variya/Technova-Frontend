
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";
import { deleteProductImageService } from "@/services/admin-product.service";
import { getApiError } from "@/lib/api-error";

interface DeleteProductImageInput {
    productId: string;
    imageId: string;
    productQueryKey?: string;
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
                        variables.productQueryKey ?? variables.productId,
                    ),
                }),
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_PRODUCTS.LIST,
                }),
            ]);
            toast.success("Product image deleted successfully.");
        },

        onError: (error: unknown) => {
            toast.error(getApiError(error).message);
        },
    });
};
