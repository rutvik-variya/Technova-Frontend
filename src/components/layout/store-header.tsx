"use client";

import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  User,
  Menu,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import Container from "./container";
import { ROUTES } from "@/constants/routes";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useCart } from "@/hooks/cart/use-cart";
import { useWishlistCount } from "../../hooks/wishlist/use-wishlist-count";
import { useCartCount } from "@/hooks/cart/use-cart-count";

export default function Header() {
  const { data } = useCurrentUser();
  const user = data?.data;

  const cartCount = useCartCount();

  const { count: wishlistCount } = useWishlistCount();
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 px-4 py-2 text-xs text-slate-300">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>
              Get 10% OFF on your first tech order! Code:{" "}
              <strong>TECH10</strong>
            </span>
          </div>

          <div className="hidden items-center gap-6 sm:flex">
            <span className="flex items-center gap-1.5 hover:text-white transition">
              <PhoneCall className="h-3.5 w-3.5" />
              +91 98765 43210
            </span>

            <Link href="/help" className="hover:text-white transition">
              Support
            </Link>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <div className="py-4">
        <Container className="flex items-center justify-between gap-4 sm:gap-8">
          {/* Brand Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Tech<span className="text-blue-600">Nova</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
            <Link
              href={ROUTES.HOME}
              className="font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Home
            </Link>

            <Link
              href={ROUTES.PRODUCTS}
              className="font-medium text-slate-600 transition hover:text-blue-600"
            >
              Shop
            </Link>

            <Link
              href={ROUTES.CONTACT}
              className="font-medium text-slate-600 transition hover:text-blue-600"
            >
              Contact
            </Link>

            <Link
              href={ROUTES.ORDERS}
              className="font-medium text-slate-600 transition hover:text-blue-600"
            >
              Orders
            </Link>
          </nav>

          {/* User Action Items */}
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href={ROUTES.WISHLIST}
              className="relative p-2 text-slate-700 transition hover:text-blue-600"
            >
              <Heart className="h-6 w-6" />

              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-sm">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href={ROUTES.CART}
              className="relative flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-2 text-blue-600 transition hover:bg-blue-100"
            >
              <ShoppingBag className="h-5 w-5" />

              <span className="text-sm font-semibold">Cart</span>

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                {cartCount}
              </span>
            </Link>

            {/* User */}
            {!user ? (
              <Link
                href={ROUTES.LOGIN}
                className="hidden items-center gap-2 text-slate-700 transition hover:text-blue-600 sm:flex"
              >
                <div className="text-left text-xs">
                  <span className="block text-gray-400">Welcome</span>
                  <span className="font-semibold">Sign In</span>
                </div>
              </Link>
            ) : (
              <Link
                href={ROUTES.PROFILE}
                className="text-slate-700 transition hover:text-blue-600"
              >
                <User className="h-7 w-7" />
              </Link>
            )}

            {/* Mobile Menu */}
            <button
              type="button"
              className="p-2 text-slate-700 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </Container>
      </div>
    </header>
  );
}
