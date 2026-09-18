"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useSyncWishlist } from "@/hooks/wishlist/use-sync-wishlist";
import { useWishlistStore } from "@/store/wishlist.store";

export function WishlistSync() {
  const { data: currentUser } = useCurrentUser();

  const user = currentUser?.data;

  const items = useWishlistStore((state) => state.items);

  const clear = useWishlistStore((state) => state.clear);

  const syncMutation = useSyncWishlist();

  const queryClient = useQueryClient();

  const hasSynced = useRef(false);

  useEffect(() => {
    if (!user) {
      hasSynced.current = false;
      return;
    }

    if (hasSynced.current) {
      return;
    }

    if (!items.length) {
      return;
    }

    hasSynced.current = true;

    const productIds = items.map((item) => item.productId);

    syncMutation.mutate(productIds, {
      onSuccess: () => {
        clear();

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.WISHLIST.ALL,
        });

        toast.success("Wishlist synchronized");
      },
      onError: () => {
        hasSynced.current = false;

        toast.error("Failed to synchronize wishlist");
      },
    });
  }, [user, items, clear, syncMutation, queryClient]);

  return null;
}
