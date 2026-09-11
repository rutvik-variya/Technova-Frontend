"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCategories } from "@/hooks/categories/use-categories";

export default function CategoryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: categories, isLoading } = useCategories();
  const selectedCategory = searchParams.get("categoryId") ?? "";

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("categoryId", value);
    } else {
      params.delete("categoryId");
    }

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <label
        htmlFor="category"
        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
      >
        Category
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleChange}
        disabled={isLoading}
        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-800 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-50"
      >
        <option value="">All Categories</option>
        {categories?.data?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
