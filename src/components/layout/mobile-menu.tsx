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
        className="absolute inset-0 h-full w-full bg-black/40"
      />

      {/* Drawer */}
      <aside className="relative h-full w-80 max-w-[85%] bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <Link
            href={ROUTES.HOME}
            onClick={() => setOpen(false)}
            className="text-xl font-bold"
          >
            TechNova
          </Link>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-5">
          <Link href={ROUTES.HOME} onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link href={ROUTES.PRODUCTS} onClick={() => setOpen(false)}>
            Products
          </Link>

          <Link href={ROUTES.WISHLIST} onClick={() => setOpen(false)}>
            Wishlist
          </Link>

          <Link href={ROUTES.ORDERS} onClick={() => setOpen(false)}>
            Orders
          </Link>

          <Link href={ROUTES.PROFILE} onClick={() => setOpen(false)}>
            Profile
          </Link>
        </nav>
      </aside>
    </div>
  );
}
