
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";
import { setPrimaryProductImageService } from "@/services/admin-product.service";
import { getApiError } from "@/lib/api-error";

interface SetPrimaryImageInput {
    productId: string;
    imageId: string;
    productQueryKey?: string;
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
                        variables.productQueryKey ?? variables.productId,
                    ),
                }),
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_PRODUCTS.LIST,
                }),
            ]);
            toast.success("Primary product image updated successfully.");
        },

        onError: (error: unknown) => {
            toast.error(getApiError(error).message);
        },
    });
};
