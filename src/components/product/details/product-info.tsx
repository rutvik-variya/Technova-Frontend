"use client";

import { useState } from "react";
import type { Product, ProductVariant } from "@/types/product";
import ProductQuantity from "./product-quantity";
import ProductVariants from "./product-variants";
import { ShoppingBag, Zap, ShieldCheck, Truck, AlertTriangle } from "lucide-react";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const firstVariant =
    (product.productVariants ?? []).find((variant) => (variant.stock ?? 0) > 0) ??
    (product.productVariants ?? [])[0];

  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariant>(firstVariant);

  const [quantity, setQuantity] = useState(1);

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setQuantity(1);
  };

  const stock = selectedVariant?.stock ?? 0;
  const isOutOfStock = stock <= 0;
  const isQuantityInvalid = quantity <= 0 || quantity > stock;
  const canAddToCart = !isOutOfStock && !isQuantityInvalid && Boolean(selectedVariant);

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Brand Badge */}
        {product.brand && (
          <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 border border-blue-200">
            {product.brand}
          </span>
        )}

        {/* Product Name */}
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          {product.name}
        </h1>

        {/* Short Description */}
        {product.shortDescription && (
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            {product.shortDescription}
          </p>
        )}

        {/* Price display */}
        <div className="mt-6 flex items-baseline gap-3">
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
            ₹{Number(selectedVariant?.price ?? 0).toLocaleString("en-IN")}
          </span>
          <span className="text-xs font-medium text-slate-500">Inclusive of all taxes</span>
        </div>

        <div className="mt-6 h-px w-full bg-slate-200" />

        {/* Variant Selectors */}
        <ProductVariants
          variants={product.productVariants ?? []}
          selectedVariant={selectedVariant}
          onChange={handleVariantChange}
        />

        {/* Stock Status & SKU */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            {isOutOfStock ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600">
                <span className="h-2 w-2 rounded-full bg-rose-600" /> Out of stock
              </span>
            ) : stock <= 5 ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                Only {stock} units remaining
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> In stock
              </span>
            )}
          </div>
          {selectedVariant?.sku && (
            <span className="text-xs font-mono font-medium text-slate-400">
              SKU: {selectedVariant.sku}
            </span>
          )}
        </div>

        {/* Quantity Controls */}
        {!isOutOfStock && (
          <ProductQuantity
            quantity={quantity}
            stock={stock}
            onChange={setQuantity}
          />
        )}

        {!isOutOfStock && isQuantityInvalid && (
          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-600">
            <AlertTriangle className="h-3.5 w-3.5" />
            Select between 1 and {stock} units.
          </p>
        )}

        {/* CTA Buttons */}
        <div className="mt-8 space-y-3">
          <button
            type="button"
            disabled={!canAddToCart}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            <ShoppingBag className="h-5 w-5" />
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>

          <button
            type="button"
            disabled={!canAddToCart}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white py-4 text-sm font-bold text-slate-900 transition-all hover:border-slate-400 hover:bg-slate-50 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Zap className="h-5 w-5 text-blue-600" />
            Buy Now
          </button>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-200 pt-6">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
          <Truck className="h-5 w-5 text-blue-600 shrink-0" />
          <span>Express Free Shipping</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
          <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0" />
          <span>1 Year Official Warranty</span>
        </div>
      </div>
    </div>
  );
}