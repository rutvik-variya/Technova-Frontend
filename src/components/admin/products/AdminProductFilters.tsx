"use client";

import type { ProductCategory, ProductStatus } from "@/types/admin-product";

interface AdminProductFiltersProps {
  search: string;
  status: ProductStatus | "ALL";
  categoryId: string;
  categories: ProductCategory[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ProductStatus | "ALL") => void;
  onCategoryChange: (value: string) => void;
}

export default function AdminProductFilters({
  search,
  status,
  categoryId,
  categories,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
}: AdminProductFiltersProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <input
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      <select
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value as ProductStatus | "ALL")
        }
        aria-label="Filter by status"
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
      >
        <option value="ALL">All statuses</option>
        <option value="ACTIVE">Active</option>
        <option value="DRAFT">Draft</option>
      </select>

      <select
        value={categoryId}
        onChange={(event) => onCategoryChange(event.target.value)}
        aria-label="Filter by category"
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
      >
        <option value="">All categories</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
