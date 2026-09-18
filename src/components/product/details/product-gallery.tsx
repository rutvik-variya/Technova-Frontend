"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product, ProductImage } from "@/types/product";
import { WishlistButton } from "./wishlist-button";

interface ProductGalleryProps {
  product: Product;
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({
  product,
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sortedImages = [...images].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
  );

  return (
    <div className="space-y-4">
      {/* Main Image Frame */}
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all">
        {/* Floating Wishlist Button with custom border & increased size */}
        <div className="absolute right-4 top-4 z-10">
          <WishlistButton
            product={product}
            className="h-12 w-12 border border-slate-200/80 bg-white/90 shadow-xs backdrop-blur-md hover:border-blue-200 hover:bg-white"
            iconClassName="h-6 w-6"
          />
        </div>

        <div className="relative h-full w-full">
          {sortedImages[selectedIndex]?.url ? (
            <Image
              src={sortedImages[selectedIndex].url}
              alt={productName}
              fill
              priority
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
              No Image Available
            </div>
          )}
        </div>
      </div>

      {/* Image Thumbnails */}
      {sortedImages.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {sortedImages.map((image, index) => {
            const isSelected = selectedIndex === index;
            return (
              <button
                key={image.id ?? index}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`relative aspect-square overflow-hidden rounded-2xl border-2 bg-white transition-all ${
                  isSelected
                    ? "border-blue-600 ring-2 ring-blue-600/20 shadow-sm"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <Image
                  src={image.url}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  loading="lazy"
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
