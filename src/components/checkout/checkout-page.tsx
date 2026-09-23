"use client";

import { useState } from "react";

import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useCheckout } from "@/hooks/checkout/use-checkout";

export function CheckoutPage() {
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();

  const user = currentUser?.data;

  const [selectedAddressId, setSelectedAddressId] = useState<string>();

  const {
    data: checkout,
    isLoading: isCheckoutLoading,
    isFetching,
    isError,
    refetch,
  } = useCheckout(selectedAddressId);

  if (isUserLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">Loading checkout...</div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        Please login to continue checkout.
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div>{/* Address section will be added in Step 2 */}</div>

        <div>{/* Order summary will be added in Step 4 */}</div>
      </div>
    </section>
  );
}
