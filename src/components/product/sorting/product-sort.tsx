"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProductSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sortBy") ?? "";
  const sortOrder = searchParams.get("sortOrder") ?? "";

  const value = sortBy ? `${sortBy}-${sortOrder}` : "";

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (!selectedValue) {
      params.delete("sortBy");
      params.delete("sortOrder");
    } else {
      const [sBy, sOrder] = selectedValue.split("-");
      params.set("sortBy", sBy);
      params.set("sortOrder", sOrder);
    }

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="product-sort"
        className="text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap"
      >
        Sort:
      </label>
      <select
        id="product-sort"
        value={value}
        onChange={handleSort}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-xs outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
      >
        <option value="">Featured</option>
        <option value="basePrice-asc">Price: Low to High</option>
        <option value="basePrice-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>
    </div>
  );
}
