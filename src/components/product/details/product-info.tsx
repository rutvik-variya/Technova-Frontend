"use client";

import { useState } from "react";
import type { Product, ProductVariant } from "@/types/product";
import ProductQuantity from "./product-quantity";
import ProductVariants from "./product-variants";
import { ShoppingBag, ShieldCheck, Truck, AlertTriangle } from "lucide-react";
import { useAddToCart } from "@/hooks/cart/use-add-to-cart";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import WishlistButton from "./wishlist-button";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter();
  const firstVariant =
    (product.productVariants ?? []).find(
      (variant) => (variant.stock ?? 0) > 0,
    ) ?? (product.productVariants ?? [])[0];

  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariant>(firstVariant);

  const [quantity, setQuantity] = useState(1);
  const addToCartMutation = useAddToCart();

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setQuantity(1);
  };

  const stock = selectedVariant?.stock ?? 0;
  const isOutOfStock = stock <= 0;
  const isQuantityInvalid = quantity <= 0 || quantity > stock;
  const canAddToCart =
    !isOutOfStock &&
    !isQuantityInvalid &&
    Boolean(selectedVariant) &&
    !addToCartMutation.isPending;

  const handleAddToCart = () => {
    if (!canAddToCart) {
      return;
    }

    addToCartMutation.mutate({
      payload: {
        productId: product.id,
        variantId: selectedVariant.id,
        quantity,
      },

      optimisticItem: {
        productId: product.id,
        variantId: selectedVariant.id,
        quantity,

        product: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          brand: product.brand ?? null,
          status: product.status ?? "",
          basePrice: String(product.basePrice ?? 0),
          maxPrice: String(product.maxPrice ?? 0),

          image:
            product.productImages?.find((image) => image.isPrimary)?.url ??
            product.productImages?.[0]?.url ??
            null,
        },

        variant: {
          id: selectedVariant.id,
          productId: product.id,
          sku: selectedVariant.sku ?? "",
          ram: selectedVariant.ram ?? null,
          storage: selectedVariant.storage ?? null,
          color: selectedVariant.color ?? null,
          price: String(selectedVariant.price ?? 0),
          comparePrice: null,
          stock,
          isActive: true,
        },
      },
    });
  };

  const handleBuyNow = () => {
    if (!canAddToCart) {
      return;
    }

    addToCartMutation.mutate(
      {
        payload: {
          productId: product.id,
          variantId: selectedVariant.id,
          quantity,
        },

        optimisticItem: {
          productId: product.id,
          variantId: selectedVariant.id,
          quantity,

          product: {
            id: product.id,
            name: product.name,
            slug: product.slug,
            brand: product.brand ?? null,
            status: product.status ?? "",
            basePrice: String(product.basePrice ?? 0),
            maxPrice: String(product.maxPrice ?? 0),

            image:
              product.productImages?.find((image) => image.isPrimary)?.url ??
              product.productImages?.[0]?.url ??
              null,
          },

          variant: {
            id: selectedVariant.id,
            productId: product.id,
            sku: selectedVariant.sku ?? "",
            ram: selectedVariant.ram ?? null,
            storage: selectedVariant.storage ?? null,
            color: selectedVariant.color ?? null,
            price: String(selectedVariant.price ?? 0),
            comparePrice: null,
            stock,
            isActive: true,
          },
        },
      },
      {
        onSuccess: () => {
          router.push(ROUTES.CHECKOUT);
        },
      },
    );
  };

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
          <span className="text-xs font-medium text-slate-500">
            Inclusive of all taxes
          </span>
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
                <span className="h-2 w-2 rounded-full bg-rose-600" /> Out of
                stock
              </span>
            ) : stock <= 5 ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                Only {stock} units remaining
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> In
                stock
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
            onClick={handleAddToCart}
            disabled={!canAddToCart}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            <ShoppingBag className="h-5 w-5" />
            {isOutOfStock
              ? "Out of Stock"
              : addToCartMutation.isPending
                ? "Adding"
                : "Add to Cart"}
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            disabled={!canAddToCart}
            className="mt-3 w-full rounded-xl border border-slate-300 px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {addToCartMutation.isPending ? "Processing..." : "Buy Now"}
          </button>

          <WishlistButton productId={product.id} />
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
