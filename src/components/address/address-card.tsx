"use client";

import { Check, MapPin, Pencil, Trash2, Phone } from "lucide-react";
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
      onClick={() => onSelect?.(address.id)}
      className={[
        "group relative rounded-2xl border p-4 sm:p-5 transition-all duration-200 cursor-pointer",
        selected
          ? "border-slate-900 bg-slate-900/[0.02] ring-1 ring-slate-900 shadow-xs"
          : "border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xs",
      ].join(" ")}
    >
      <div className="flex items-start gap-3.5">
        {onSelect && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(address.id);
            }}
            className={[
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
              selected
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-300 bg-white group-hover:border-slate-400",
            ].join(" ")}
            aria-label={`Select ${address.fullName}'s address`}
          >
            {selected && <Check className="h-3 w-3 stroke-[3]" />}
          </button>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                {address.fullName}
              </h3>

              {address.isDefault && (
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase text-slate-700">
                  Default
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 sm:text-sm">
              <Phone className="h-3.5 w-3.5 text-slate-400" />
              <span>{address.phone}</span>
            </div>
          </div>

          <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-slate-500">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <span className="uppercase tracking-wider">
              {address.addressType}
            </span>
          </div>

          <div className="mt-3 space-y-0.5 text-xs text-slate-600 leading-relaxed sm:text-sm">
            <p className="font-medium text-slate-800">{address.addressLine1}</p>

            {address.addressLine2 && <p>{address.addressLine2}</p>}

            {address.landmark && (
              <p className="text-slate-500">Landmark: {address.landmark}</p>
            )}

            <p className="font-medium text-slate-800">
              {address.city}, {address.state} - {address.postalCode}
            </p>

            <p className="text-slate-500">{address.country}</p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            {onEdit && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(address);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <Pencil className="h-3 w-3" />
                Edit
              </button>
            )}

            {onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(address.id);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
              >
                <Trash2 className="h-3 w-3" />
                Delete
              </button>
            )}

            {!address.isDefault && onSetDefault && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSetDefault(address.id);
                }}
                className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:underline"
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
