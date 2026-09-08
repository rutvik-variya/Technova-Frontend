"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useBrands } from "@/hooks/use-brand";

export default function BrandFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: BRANDS } = useBrands();
  const selectedBrand = searchParams.get("brand") ?? "";

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("brand", value);
    } else {
      params.delete("brand");
    }

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <label
        htmlFor="brand"
        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
      >
        Brand
      </label>
      <select
        id="brand"
        value={selectedBrand}
        onChange={handleChange}
        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-800 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
      >
        <option value="">All Brands</option>
        {(BRANDS?.data ?? []).map((b) => (
          <option key={b.brand} value={b.brand}>
            {b.brand}
          </option>
        ))}
      </select>
    </div>
  );
}
