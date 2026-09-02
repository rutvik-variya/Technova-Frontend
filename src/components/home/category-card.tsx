"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { Category } from "@/types/category";
import { CATEGORY_IMAGES } from "@/constants/category-images";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const image =
    CATEGORY_IMAGES[category.slug] ||
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80";

  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md hover:shadow-slate-200/50"
    >
      <div className="flex items-center gap-3.5">
        {/* Circle Image Avatar */}
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100 ring-2 ring-transparent transition-all duration-300 group-hover:ring-blue-600">
          <Image
            src={image}
            alt={category.name}
            fill
            sizes="56px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Text Details */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 transition-colors duration-200 group-hover:text-blue-600">
            {category.name}
          </h3>
          <p className="mt-0.5 text-xs text-slate-400">Explore products</p>
        </div>
      </div>

      {/* Trailing Icon */}
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors duration-200 group-hover:bg-blue-50 group-hover:text-blue-600">
        <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
