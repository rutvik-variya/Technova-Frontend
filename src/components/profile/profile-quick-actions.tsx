import Link from "next/link";
import { Heart, Package, Settings } from "lucide-react";

import LogoutButton from "@/components/auth/logout-button";
import { ROUTES } from "@/constants/routes";

export default function ProfileQuickActions() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
      <h2 className="text-base font-bold text-slate-900">Quick Actions</h2>

      <div className="mt-4 space-y-2">
        <Link
          href={ROUTES.ORDERS}
          className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Package className="h-4 w-4 text-blue-600" />

          <span>My Orders</span>
        </Link>

        <Link
          href={ROUTES.WISHLIST}
          className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Heart className="h-4 w-4 text-red-500" />

          <span>Wishlist</span>
        </Link>

        <Link
          href={ROUTES.CHANGE_PASSWORD}
          className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Settings className="h-4 w-4 text-slate-500" />

          <span>Change Password</span>
        </Link>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-6">
        <LogoutButton />
      </div>
    </div>
  );
}
