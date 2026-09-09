"use client";

import { Minus, Plus } from "lucide-react";

interface ProductQuantityProps {
  quantity: number;
  stock: number;
  onChange: (quantity: number) => void;
}

export default function ProductQuantity({
  quantity,
  stock,
  onChange,
}: ProductQuantityProps) {
  const decrease = () => {
    if (quantity > 1) onChange(quantity - 1);
  };

  const increase = () => {
    if (quantity < stock) onChange(quantity + 1);
  };

  return (
    <div className="mt-6">
      <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-500">
        Quantity
      </h3>

      <div className="flex w-fit items-center rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={decrease}
          disabled={quantity <= 1}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>

        <span className="flex h-9 min-w-12 items-center justify-center px-2 text-sm font-bold text-slate-900">
          {quantity}
        </span>

        <button
          type="button"
          onClick={increase}
          disabled={quantity >= stock}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
