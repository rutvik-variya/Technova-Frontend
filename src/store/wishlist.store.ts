import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
    GuestWishlistItem,
} from "@/types/wishlist";

interface WishlistState {
    items: GuestWishlistItem[];

    addItem: (item: GuestWishlistItem) => void;

    removeItem: (productId: string) => void;

    clear: () => void;

    hasItem: (productId: string) => boolean;

    getCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                const exists = get().items.some(
                    (wishlistItem) =>
                        wishlistItem.productId === item.productId
                );

                if (exists) {
                    return;
                }

                set((state) => ({
                    items: [...state.items, item],
                }));
            },

            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter(
                        (item) =>
                            item.productId !== productId
                    ),
                }));
            },

            clear: () => {
                set({
                    items: [],
                });
            },

            hasItem: (productId) => {
                return get().items.some(
                    (item) =>
                        item.productId === productId
                );
            },

            getCount: () => {
                return get().items.length;
            },
        }),
        {
            name: "technova-wishlist",
        }
    )
);