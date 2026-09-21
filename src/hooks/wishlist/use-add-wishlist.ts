"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addWishlist } from "@/services/wishlist.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { AddWishlistPayload } from "@/types/wishlist";

export const useAddWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: AddWishlistPayload) => addWishlist(payload),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.WISHLIST.ALL,
            });

            toast.success("Added to wishlist");
        },
    });
};