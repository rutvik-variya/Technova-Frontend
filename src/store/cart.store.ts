"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
    GuestCartItem,
    OptimisticCartItem,
} from "@/types/cart";

interface CartStore {
    items: GuestCartItem[];

    addItem: (item: OptimisticCartItem) => void;
    updateItem: (variantId: string, quantity: number) => void;
    removeItem: (variantId: string) => void;
    clearCart: () => void;

    getItem: (variantId: string) => GuestCartItem | undefined;
    getTotalItems: () => number;
    getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                set((state) => {
                    const existingItem = state.items.find(
                        (cartItem) =>
                            cartItem.productId === item.productId &&
                            cartItem.variantId === item.variantId,
                    );

                    if (existingItem) {
                        const nextQuantity =
                            existingItem.quantity + item.quantity;

                        const updatedItems = state.items.map((cartItem) => {
                            if (
                                cartItem.productId !== item.productId ||
                                cartItem.variantId !== item.variantId
                            ) {
                                return cartItem;
                            }

                            return {
                                ...cartItem,
                                quantity: Math.min(
                                    nextQuantity,
                                    cartItem.variant.stock,
                                ),
                            };
                        });

                        return {
                            items: updatedItems,
                        };
                    }

                    return {
                        items: [
                            ...state.items,
                            {
                                productId: item.productId,
                                variantId: item.variantId,
                                quantity: Math.min(
                                    item.quantity,
                                    item.variant.stock,
                                ),
                                product: item.product,
                                variant: item.variant,
                            },
                        ],
                    };
                });
            },

            updateItem: (variantId, quantity) => {
                set((state) => ({
                    items: state.items.map((item) => {
                        if (item.variantId !== variantId) {
                            return item;
                        }

                        return {
                            ...item,
                            quantity: Math.min(
                                Math.max(quantity, 1),
                                item.variant.stock,
                            ),
                        };
                    }),
                }));
            },

            removeItem: (variantId) => {
                set((state) => ({
                    items: state.items.filter(
                        (item) => item.variantId !== variantId,
                    ),
                }));
            },

            clearCart: () => {
                set({ items: [] });
            },

            getItem: (variantId) => {
                return get().items.find(
                    (item) => item.variantId === variantId,
                );
            },

            getTotalItems: () => {
                return get().items.reduce(
                    (total, item) => total + item.quantity,
                    0,
                );
            },

            getSubtotal: () => {
                return get().items.reduce(
                    (total, item) =>
                        total +
                        Number(item.variant.price) * item.quantity,
                    0,
                );
            },
        }),
        {
            name: "technova-cart",
        },
    ),
);