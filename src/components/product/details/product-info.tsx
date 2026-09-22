"use client";

import { useMemo, useState } from "react";
import type { Product, ProductVariant } from "@/types/product";
import ProductQuantity from "./product-quantity";
import ProductVariants from "./product-variants";
import { ShoppingBag, ShieldCheck, Truck, AlertTriangle } from "lucide-react";
import { useAddToCart } from "@/hooks/cart/use-add-to-cart";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter();

  const variants = product.productVariants ?? [];

  const firstVariant =
    variants.find((variant) => (variant.stock ?? 0) > 0) ?? variants[0];

  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(firstVariant);

  const [quantity, setQuantity] = useState(1);

  const addToCartMutation = useAddToCart();

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setQuantity(1);
  };

  const stock = selectedVariant?.stock ?? 0;

  const isOutOfStock = !selectedVariant || stock <= 0;

  const isQuantityInvalid =
    !selectedVariant || quantity <= 0 || quantity > stock;

  const optimisticItem = useMemo(() => {
    if (!selectedVariant) {
      return undefined;
    }

    return {
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
        comparePrice: String(selectedVariant.price ?? 0),
        stock,
        isActive: selectedVariant.isActive ?? true,
      },
    };
  }, [product, selectedVariant, quantity, stock]);

  const canAddToCart =
    Boolean(selectedVariant) &&
    !isOutOfStock &&
    !isQuantityInvalid &&
    !addToCartMutation.isPending;

  const handleAddToCart = () => {
    if (!canAddToCart || !selectedVariant || !optimisticItem) {
      return;
    }

    addToCartMutation.mutate({
      payload: {
        productId: product.id,
        variantId: selectedVariant.id,
        quantity,
      },
      isAuthenticated: false,
      optimisticItem,
    });
  };

  const handleBuyNow = () => {
    if (!canAddToCart || !selectedVariant || !optimisticItem) {
      return;
    }

    addToCartMutation.mutate(
      {
        payload: {
          productId: product.id,
          variantId: selectedVariant.id,
          quantity,
        },
        isAuthenticated: false,
        optimisticItem,
      },
      {
        onSuccess: () => {
          router.push(ROUTES.CHECKOUT);
        },
      },
    );
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        {product.brand && (
          <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
            {product.brand}
          </span>
        )}

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {product.name}
        </h1>

        {product.shortDescription && (
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {product.shortDescription}
          </p>
        )}

        <div className="mt-6 flex items-baseline gap-3">
          <span className="text-4xl font-extrabold tracking-tight text-slate-900">
            ₹{Number(selectedVariant?.price ?? 0).toLocaleString("en-IN")}
          </span>

          <span className="text-xs font-medium text-slate-500">
            Inclusive of all taxes
          </span>
        </div>

        <div className="mt-6 h-px w-full bg-slate-200" />

        <ProductVariants
          variants={variants}
          selectedVariant={selectedVariant ?? variants[0]!}
          onChange={handleVariantChange}
        />

        <div className="mt-6 flex items-center justify-between">
          <div>
            {isOutOfStock ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600">
                <span className="h-2 w-2 rounded-full bg-rose-600" />
                Out of stock
              </span>
            ) : stock <= 5 ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600">
                <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                Only {stock} units remaining
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                In stock
              </span>
            )}
          </div>

          {selectedVariant?.sku && (
            <span className="font-mono text-xs font-medium text-slate-400">
              SKU: {selectedVariant.sku}
            </span>
          )}
        </div>

        {!isOutOfStock && (
          <ProductQuantity
            quantity={quantity}
            stock={stock}
            onChange={setQuantity}
          />
        )}

        {isQuantityInvalid && !isOutOfStock && (
          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-600">
            <AlertTriangle className="h-3.5 w-3.5" />
            Select between 1 and {stock} units.
          </p>
        )}

        <div className="mt-8 space-y-3">
          {/* Add To Cart */}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
            >
              <ShoppingBag className="h-5 w-5" />

              {isOutOfStock
                ? "Out of Stock"
                : addToCartMutation.isPending
                  ? "Adding..."
                  : "Add to Cart"}
            </button>
          </div>

          {/* Buy Now */}

          <button
            type="button"
            onClick={handleBuyNow}
            disabled={!canAddToCart}
            className="w-full rounded-2xl border border-slate-300 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {addToCartMutation.isPending ? "Processing..." : "Buy Now"}
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-200 pt-6">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
          <Truck className="h-5 w-5 shrink-0 text-blue-600" />
          <span>Express Free Shipping</span>
        </div>

        <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
          <ShieldCheck className="h-5 w-5 shrink-0 text-blue-600" />
          <span>1 Year Official Warranty</span>
        </div>
      </div>
    </div>
  );
}
