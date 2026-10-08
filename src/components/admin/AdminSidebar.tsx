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
    <aside className="sticky top-0 flex h-screen flex-col bg-white/80 backdrop-blur-md">
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white font-bold shadow-md shadow-slate-900/10">
            T
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Tech<span className="text-rose-600">Nova</span>
          </span>
        </Link>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
          <ShieldCheck className="h-3 w-3 text-emerald-600" /> Admin
        </span>
      </div>

      {/* Navigation Section Label */}
      <div className="px-6 pt-5 pb-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Management Console
        </p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1.5 px-3 py-2">
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
              className={`group flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                    isActive
                      ? "text-rose-500"
                      : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />
                <span>{item.name}</span>
              </div>
              {isActive && (
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="border-t border-slate-100 p-4">
        <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3 text-center">
          <p className="text-xs font-medium text-slate-600">Store Status</p>
          <div className="mt-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live & Active
          </div>
        </div>
      </div>
    </aside>
  );
}
