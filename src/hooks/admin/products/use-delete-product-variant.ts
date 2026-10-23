import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";
import { deleteProductVariantService } from "@/services/admin-product.service";
import { getApiError } from "@/lib/api-error";

interface DeleteProductVariantInput {
    productId: string;
    productSlug: string;
    variantId: string;
}

export const useDeleteProductVariant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ variantId }: DeleteProductVariantInput) =>
            deleteProductVariantService(variantId),

        onSuccess: async (_data, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_PRODUCTS.DETAIL(
                        variables.productSlug,
                    ),
                }),
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.ADMIN_PRODUCTS.LIST,
                }),
            ]);
            toast.success("Product variant deleted successfully.");
        },

        onError: (error: unknown) => {
            toast.error(getApiError(error).message);
        },
    });
};