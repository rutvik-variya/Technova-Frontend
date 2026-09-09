"use client";

import { ProductImage } from "@/types/product";
import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sortedImages = [...images].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
  );

  return (
    <div className="space-y-4">
      {/* Main Image Frame */}
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all">
        <div className="relative h-full w-full">
          {sortedImages[selectedIndex]?.url ? (
            <Image
              src={sortedImages[selectedIndex].url}
              alt={productName}
              fill
              priority
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