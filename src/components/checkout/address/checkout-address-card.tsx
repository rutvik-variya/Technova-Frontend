"use client";

import { CheckoutAddress } from "@/types/checkout";
import { Check, Pencil } from "lucide-react";

interface CheckoutAddressCardProps {
  address: CheckoutAddress;
  selected: boolean;
  onSelect: (addressId: string) => void;
}

export function CheckoutAddressCard({
  address,
  selected,
  onSelect,
}: CheckoutAddressCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(address.id)}
      className={`w-full rounded-2xl border p-5 text-left transition ${
        selected
          ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900">{address.fullName}</h3>

          <p className="mt-1 text-sm text-slate-600">{address.phone}</p>

          <div className="mt-3 space-y-1 text-sm text-slate-600">
            <p>{address.addressLine1}</p>

            {address.addressLine2 && <p>{address.addressLine2}</p>}

            <p>
              {address.city}, {address.state} - {address.postalCode}
            </p>

            <p>{address.country}</p>
          </div>
        </div>

        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
            selected
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-300 text-transparent"
          }`}
        >
          <Check className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
}
