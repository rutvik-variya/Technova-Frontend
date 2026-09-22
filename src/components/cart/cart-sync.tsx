"use client";

import { useEffect, useRef } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";

import { syncCart } from "@/services/cart.service";

import { useCartStore } from "@/store/cart.store";

import { useCurrentUser } from "@/hooks/auth/use-current-user";

export function CartSync() {
  const { data: user } = useCurrentUser();

  const queryClient = useQueryClient();

  const items = useCartStore((state) => state.items);

  const clearCart = useCartStore((state) => state.clearCart);

  const isSyncing = useRef(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (!items.length) {
      return;
    }

    if (isSyncing.current) {
      return;
    }

    isSyncing.current = true;

    const syncGuestCart = async () => {
      try {
        const cart = await syncCart({
          items: items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        });

        /*
         * Server cart becomes the
         * source of truth.
         */
        queryClient.setQueryData(QUERY_KEYS.CART.DETAIL, cart);

        /*
         * Only clear guest cart after
         * successful server sync.
         */
        clearCart();
      } catch {
        toast.error("Unable to sync your cart. Please try again.");
      } finally {
        isSyncing.current = false;
      }
    };

    syncGuestCart();
  }, [user, items, queryClient, clearCart]);

  return null;
}
