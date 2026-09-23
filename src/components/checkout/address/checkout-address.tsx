"use client";

import { MapPin } from "lucide-react";

import { CheckoutAddressList } from "./checkout-address-list";
import { CheckoutAddAddress } from "./checkout-add-address";
import type { CheckoutAddress } from "@/types/checkout";

interface CheckoutAddressProps {
  addresses: CheckoutAddress[];
  selectedAddressId?: string;
  onSelectAddress: (addressId: string) => void;
  onAddAddress: () => void;
  isLoading?: boolean;
}

export function CheckoutAddress({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onAddAddress,
  isLoading = false,
}: CheckoutAddressProps) {
  if (isLoading) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-6 h-7 w-48 animate-pulse rounded bg-slate-200" />

        <div className="space-y-4">
          <div className="h-32 animate-pulse rounded-2xl bg-slate-100" />
          <div className="h-32 animate-pulse rounded-2xl bg-slate-100" />
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <MapPin className="h-4 w-4" />
            </span>

            <h2 className="text-xl font-bold text-slate-900">
              Billing Details
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Select an address for your order.
          </p>
        </div>
      </div>

      {addresses.length > 0 ? (
        <CheckoutAddressList
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          onSelect={onSelectAddress}
        />
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
          <MapPin className="mx-auto h-8 w-8 text-slate-400" />

          <h3 className="mt-3 font-semibold text-slate-900">
            No address found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Add an address to continue checkout.
          </p>
        </div>
      )}

      <div className="mt-5">
        <CheckoutAddAddress onAddAddress={onAddAddress} />
      </div>
    </section>
  );
}
