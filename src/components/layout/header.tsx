"use client";

import Link from "next/link";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import Container from "./container";

export default function Header() {
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
              <PhoneCall className="h-3.5 w-3.5" /> +91 98765 43210
            </span>
            <Link href="/help" className="hover:text-white transition">
              Support
            </Link>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-100 py-4">
        <Container className="flex items-center justify-between gap-4 sm:gap-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Tech<span className="text-blue-600">Nova</span>
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden max-w-md flex-1 md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search laptops, smartphones, accessories..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-10 text-sm text-slate-900 outline-none transition duration-200 placeholder:text-gray-400 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
              <button
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* User Action Items */}
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href="/login"
              className="hidden items-center gap-2 text-slate-700 transition hover:text-blue-600 sm:flex"
            >
              <User className="h-5 w-5" />
              <div className="text-left text-xs">
                <span className="block text-gray-400">Welcome</span>
                <span className="font-semibold">Sign In</span>
              </div>
            </Link>

            <Link
              href="/wishlist"
              className="relative p-2 text-slate-700 hover:text-blue-600"
            >
              <Heart className="h-6 w-6" />
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                0
              </span>
            </Link>

            <Link
              href="/cart"
              className="relative flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-2 text-blue-600 transition hover:bg-blue-100"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="text-sm font-semibold">Cart</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                0
              </span>
            </Link>

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

      {/* Navigation Links */}
      <nav className="hidden border-b border-gray-100 bg-white md:block">
        <Container className="flex items-center gap-8 py-3 text-sm font-medium text-slate-600">
          <Link
            href="/products"
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            All Products
          </Link>
          <Link
            href="/products?category=laptops"
            className="hover:text-blue-600 transition"
          >
            Laptops & PC
          </Link>
          <Link
            href="/products?category=mobiles"
            className="hover:text-blue-600 transition"
          >
            Mobile & Tablets
          </Link>
          <Link
            href="/products?category=accessories"
            className="hover:text-blue-600 transition"
          >
            Accessories
          </Link>
          <Link
            href="/products?category=gaming"
            className="hover:text-blue-600 transition"
          >
            Gaming Zone
          </Link>
        </Container>
      </nav>
    </header>
  );
}
