"use client";

import { X } from "lucide-react";
import CategoryFilter from "./category-filter";
import BrandFilter from "./brand-filter";
import PriceFilter from "./price-filter";
import ClearFilters from "./clear-filters";

interface ProductFiltersProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function ProductFilters({
  mobileOpen = false,
  onCloseMobile,
}: ProductFiltersProps) {
  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">Filters</h2>
          <p className="text-xs text-slate-500">Refine catalog search</p>
        </div>
        <ClearFilters />
      </div>

      <CategoryFilter />
      <BrandFilter />
      <PriceFilter />
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden h-fit rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs lg:block">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-lg font-bold text-slate-900">Filters</h2>
              <button
                type="button"
                onClick={onCloseMobile}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{content}</div>
          </div>
        </div>
      )}
    </>
  );
}
