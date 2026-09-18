"use client";

import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useWishlistStore } from "@/store/wishlist.store";
import { useWishlist } from "./use-wishlist";

export const useWishlistStatus = (
    productId: string
) => {
    const { data: currentUser } =
        useCurrentUser();

    const user = currentUser?.data;

    const guestHasItem = useWishlistStore(
        (state) =>
            state.items.some(
                (item) =>
                    item.productId === productId
            )
    );

    const {
        data: wishlist,
        isLoading,
    } = useWishlist();

    const serverHasItem =
        wishlist?.some(
            (item) =>
                item.product.id === productId
        ) ?? false;

    return {
        isLoggedIn: Boolean(user),

        isWishlisted: user
            ? serverHasItem
            : guestHasItem,

        isLoading: user
            ? isLoading
            : false,
    };
};