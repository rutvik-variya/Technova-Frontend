"use client";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getApiError } from "@/lib/api-error";
import { addToCart, AddToCartPayload } from "@/services/cart.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: AddToCartPayload) => {
            return addToCart(payload)
        },
        onSuccess: async (response) => {
            toast.success(response.message || "Product added to cart")

            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.CART.DETAIL
            })
        },
        onError: (error) => {
            const apiError = getApiError(error);
            toast.error(apiError.message)
        }
    })
}