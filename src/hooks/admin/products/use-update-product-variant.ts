import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { updateProductVariantService } from "@/services/admin-product.service";
import type { UpdateVariantPayload } from "@/types/admin-product";

interface UpdateProductVariantInput {
    productId: string;
    variantId: string;
    payload: UpdateVariantPayload;
}

export const useUpdateProductVariant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        // Pass productId to the service if needed, otherwise just use variantId
        mutationFn: ({ variantId, payload }: UpdateProductVariantInput) =>
            updateProductVariantService(variantId, payload),

        onSuccess: async (_data, variables) => {
            // Now variables.productId exists because we will pass it in Step 3
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