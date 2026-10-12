
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { uploadProductImagesService } from "@/services/admin-product.service";

interface UploadProductImagesInput {
    productId: string;
    files: File[];
}

export const useUploadProductImages = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ productId, files }: UploadProductImagesInput) =>
            uploadProductImagesService(productId, files),

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
