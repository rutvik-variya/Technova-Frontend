"use client";

import { Plus } from "lucide-react";

interface CheckoutAddAddressProps {
    onAddAddress: () => void;
}

export function CheckoutAddAddress({
    onAddAddress,
}: CheckoutAddAddressProps) {
    return (
        <button
            type="button"
            onClick={onAddAddress}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-50"
        >
            <Plus className="h-4 w-4" />
            Add New Address
        </button>
    );
}