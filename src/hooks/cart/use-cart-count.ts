"use client";

import { useCartStore } from "@/store/cart.store";
import { useCart } from "./use-cart";

import { useCurrentUser } from "@/hooks/auth/use-current-user";

export const useCartCount = () => {
    const { data: user } = useCurrentUser();

    const guestCount =
        useCartStore(
            (state) =>
                state.items.reduce(
                    (total, item) =>
                        total + item.quantity,
                    0,
                ),
        );

    const {
        data: cart,
    } = useCart();

    if (!user) {
        return guestCount;
    }

    return cart?.totalItem ?? 0;
};