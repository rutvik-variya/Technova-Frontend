"use client";

import Link from "next/link";
import { X } from "lucide-react";

import { ROUTES } from "@/constants/routes";
import { useUIStore } from "@/store/ui.store";

export default function MobileMenu() {
  const isOpen = useUIStore((state) => state.isMobileMenuOpen);
  const setOpen = useUIStore((state) => state.setMobileMenuOpen);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={() => setOpen(false)}
        className="absolute inset-0 h-full w-full bg-black/40 backdrop-blur-xs"
      />

      {/* Drawer */}
      <aside className="relative flex h-full w-80 max-w-[85%] flex-col bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <Link
            href={ROUTES.HOME}
            onClick={() => setOpen(false)}
            className="text-xl font-bold text-slate-900"
          >
            Tech<span className="text-blue-600">Nova</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="p-1 text-slate-500 hover:text-slate-900"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-5 text-lg font-medium text-slate-700">
          <Link
            href={ROUTES.HOME}
            onClick={() => setOpen(false)}
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            href={ROUTES.PRODUCTS}
            onClick={() => setOpen(false)}
            className="hover:text-blue-600 transition"
          >
            Products
          </Link>

          <Link
            href={ROUTES.WISHLIST}
            onClick={() => setOpen(false)}
            className="hover:text-blue-600 transition"
          >
            Wishlist
          </Link>

          <Link
            href={ROUTES.ORDERS}
            onClick={() => setOpen(false)}
            className="hover:text-blue-600 transition"
          >
            Orders
          </Link>

          <Link
            href={ROUTES.PROFILE}
            onClick={() => setOpen(false)}
            className="hover:text-blue-600 transition"
          >
            Profile
          </Link>
        </nav>
      </aside>
    </div>
  );
}
