"use client";

import type { ProductVariant } from "@/types/product";
import { getProductVariantAttributes } from "@/utils/product-variant";

interface ProductVariantsProps {
  variants: ProductVariant[];
  selectedVariant?: ProductVariant;
  onChange: (variant: ProductVariant) => void;
}

export default function ProductVariants({
  variants,
  selectedVariant,
  onChange,
}: ProductVariantsProps) {
  const optionValues = new Map<string, Set<string>>();

  variants.forEach((variant) => {
    Object.entries(getProductVariantAttributes(variant)).forEach(
      ([name, value]) => {
        const values = optionValues.get(name) ?? new Set<string>();
        values.add(value);
        optionValues.set(name, values);
      },
    );
  });

  const selectedAttributes = selectedVariant
    ? getProductVariantAttributes(selectedVariant)
    : {};

  const selectVariant = (name: string, value: string) => {
    const candidates = variants.filter(
      (variant) => getProductVariantAttributes(variant)[name] === value,
    );
    const matchingVariant = candidates.find((candidate) => {
      const attributes = getProductVariantAttributes(candidate);
      return Object.entries(selectedAttributes).every(
        ([selectedName, selectedValue]) =>
          selectedName === name || attributes[selectedName] === selectedValue,
      );
    });

    const variant = matchingVariant ?? candidates[0];
    if (variant) onChange(variant);
  };

  return (
    <div className="mt-6 space-y-6">
      {[...optionValues.entries()].map(([name, values]) => (
        <div key={name}>
          <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-500">
            {name}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {[...values].map((value) => {
              const isSelected = selectedAttributes[name] === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => selectVariant(name, value)}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-semibold tracking-wide transition-all ${
                    isSelected
                      ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600/30 shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
