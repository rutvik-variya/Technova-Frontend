"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { addWishlist } from "@/services/wishlist.service";
import { QUERY_KEYS } from "@/constants/query-keys";

import type {
    WishlistItem,
    AddWishlistPayload,
} from "@/types/wishlist";

export const useAddWishlist = () => {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (
            payload: AddWishlistPayload
        ) => addWishlist(payload),

        onSuccess: (response) => {
            const newItem =
                response?.data as WishlistItem;

            if (!newItem?.product) {
                queryClient.invalidateQueries({
                    queryKey:
                        QUERY_KEYS.WISHLIST.ALL,
                });

                return;
            }

            queryClient.setQueryData<WishlistItem[]>(
                QUERY_KEYS.WISHLIST.ALL,
                (oldWishlist = []) => {
                    const alreadyExists =
                        oldWishlist.some(
                            (item) =>
                                item.product.id ===
                                newItem.product.id
                        );

                    if (alreadyExists) {
                        return oldWishlist;
                    }

                    return [
                        newItem,
                        ...oldWishlist,
                    ];
                }
            );

            toast.success("Added to wishlist");
        },
    });
};