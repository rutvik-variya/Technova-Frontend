"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  FolderTree,
  ShoppingCart,
  Users,
  TicketPercent,
  Truck,
  LayoutDashboard,
  ShieldCheck,
  ChevronRight,
  Store,
} from "lucide-react";

const adminNavigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Boxes },
  { name: "Categories", href: "/admin/categories", icon: FolderTree },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Coupons", href: "/admin/coupons", icon: TicketPercent },
  { name: "Shipping", href: "/admin/shipping", icon: Truck },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen flex-col border-r border-slate-200/80 bg-white">
      {/* Brand Header */}
      <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white font-black text-lg shadow-md shadow-slate-900/10">
            T
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Tech<span className="text-blue-600">Nova</span>
            </span>
          </div>
        </Link>

        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
          <ShieldCheck className="h-3 w-3 text-emerald-600" /> Admin
        </span>
      </div>

      {/* Navigation Section Label */}
      <div className="px-6 pt-6 pb-2">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
          Management Console
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 px-4 py-2">
        {adminNavigation.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center justify-between rounded-2xl px-4 py-3 text-xs font-bold transition-all duration-200 ${
                isActive
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/15"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-xl transition-all ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span
                  className={`tracking-tight ${isActive ? "text-white" : "text-slate-700"}`}
                >
                  {item.name}
                </span>
              </div>

              {isActive && (
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Store Front Quick Link & Status */}
      <div className="p-4 space-y-2 border-t border-slate-100">
        <Link
          href="/"
          target="_blank"
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
        >
          <Store className="h-3.5 w-3.5 text-slate-500" />
          <span>View Storefront</span>
        </Link>

        <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3 text-center">
          <p className="text-[11px] font-bold text-slate-500">Store Status</p>
          <div className="mt-1 flex items-center justify-center gap-1.5 text-xs font-extrabold text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live & Operational
          </div>
        </div>
      </div>
    </aside>
  );
}
