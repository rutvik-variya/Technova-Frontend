"use client";

import { Check, MapPin, Pencil, Trash2 } from "lucide-react";

import type { Address } from "@/types/address";

interface AddressCardProps {
  address: Address;
  selected?: boolean;
  onSelect?: (addressId: string) => void;
  onEdit?: (address: Address) => void;
  onDelete?: (addressId: string) => void;
  onSetDefault?: (addressId: string) => void;
}

export function AddressCard({
  address,
  selected = false,
  onSelect,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  return (
    <div
      className={[
        "rounded-xl border p-4 transition",
        selected ? "border-black ring-1 ring-black" : "border-gray-200",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        {onSelect && (
          <button
            type="button"
            onClick={() => onSelect(address.id)}
            className={[
              "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
              selected ? "border-black bg-black text-white" : "border-gray-300",
            ].join(" ")}
            aria-label={`Select ${address.fullName}'s address`}
          >
            {selected && <Check className="h-3 w-3" />}
          </button>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">
                  {address.fullName}
                </h3>

                {address.isDefault && (
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                    Default
                  </span>
                )}
              </div>

              <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="h-3.5 w-3.5" />
                {address.addressType}
              </div>
            </div>

            <span className="text-sm text-gray-500">{address.phone}</span>
          </div>

          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <p>{address.addressLine1}</p>

            {address.addressLine2 && <p>{address.addressLine2}</p>}

            {address.landmark && <p>{address.landmark}</p>}

            <p>
              {address.city}, {address.state} {address.postalCode}
            </p>

            <p>{address.country}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(address)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
            )}

            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(address.id)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            )}

            {!address.isDefault && onSetDefault && (
              <button
                type="button"
                onClick={() => onSetDefault(address.id)}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:underline"
              >
                Set as default
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
