"use client";

import type { ProductVariant } from "@/types/product";

interface ProductVariantsProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onChange: (variant: ProductVariant) => void;
}

export default function ProductVariants({
  variants,
  selectedVariant,
  onChange,
}: ProductVariantsProps) {
  const ramOptions = [
    ...new Set(
      variants
        .map((variant) => variant.ram)
        .filter((value): value is string => Boolean(value)),
    ),
  ];

  const storageOptions = [
    ...new Set(
      variants
        .map((variant) => variant.storage)
        .filter((value): value is string => Boolean(value)),
    ),
  ];

  const colorOptions = [
    ...new Set(
      variants
        .map((variant) => variant.color)
        .filter((value): value is string => Boolean(value)),
    ),
  ];

  const selectVariant = (type: "ram" | "storage" | "color", value: string) => {
    const variant = variants.find((item) => {
      if (type === "ram") return item.ram === value;
      if (type === "storage") return item.storage === value;
      return item.color === value;
    });

    if (variant) {
      onChange(variant);
    }
  };

  const renderOptionButtons = (
    options: string[],
    currentValue: string | undefined,
    type: "ram" | "storage" | "color",
  ) => (
    <div className="flex flex-wrap gap-2.5">
      {options.map((option) => {
        const isSelected = currentValue === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => selectVariant(type, option)}
            className={`rounded-xl border px-4 py-2.5 text-sm font-semibold tracking-wide transition-all ${
              isSelected
                ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600/30 shadow-sm"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="mt-6 space-y-6">
      {ramOptions.length > 0 && (
        <div>
          <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-500">
            Memory (RAM)
          </h3>
          {renderOptionButtons(ramOptions, selectedVariant?.ram, "ram")}
        </div>
      )}

      {storageOptions.length > 0 && (
        <div>
          <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-500">
            Storage Capacity
          </h3>
          {renderOptionButtons(
            storageOptions,
            selectedVariant?.storage,
            "storage",
          )}
        </div>
      )}

      {colorOptions.length > 0 && (
        <div>
          <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-500">
            Color Option
          </h3>
          {renderOptionButtons(colorOptions, selectedVariant?.color, "color")}
        </div>
      )}
    </div>
  );
}
