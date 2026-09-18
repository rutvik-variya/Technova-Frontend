"use client";

import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useWishlist } from "@/hooks/wishlist/use-wishlist";

import { useWishlistStore } from "@/store/wishlist.store";

export const useWishlistCount = () => {
    const { data: currentUser } =
        useCurrentUser();

    const user = currentUser?.data;

    const guestCount = useWishlistStore(
        (state) => state.items.length
    );

    const {
        data: wishlist,
        isLoading,
    } = useWishlist();

    if (!user) {
        return {
            count: guestCount,
            isLoading: false,
        };
    }

    return {
        count: wishlist?.length ?? 0,
        isLoading,
    };
};