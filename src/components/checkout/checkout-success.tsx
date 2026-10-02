"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Copy,
  Check,
  PackageCheck,
  ArrowRight,
  ShoppingBag,
  Mail,
  Truck,
} from "lucide-react";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [copied, setCopied] = useState(false);

  const handleCopyOrderId = () => {
    if (!orderId) return;
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-[85vh] bg-slate-50/50 px-4 py-12 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Main Success Card */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
          {/* Subtle Ambient Background Gradient Accent */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            {/* Animated Success Icon Badge */}
            <div className="relative mb-6">
              <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20 duration-1000" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200/60 shadow-inner">
                <CheckCircle2
                  className="h-10 w-10 text-emerald-600"
                  strokeWidth={2.2}
                />
              </div>
            </div>

            {/* Heading */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/60 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200/50 mb-3">
              Payment Confirmed
            </span>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Order Placed Successfully!
            </h1>

            {/* Description */}
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
              Thank you for your order. We&apos;ve received your request and are
              preparing your items for delivery.
            </p>

            {/* Order ID Box with Interactive Copying */}
            {orderId && (
              <div className="mt-6 w-full rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 transition-all hover:bg-slate-50">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0 text-left">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 shadow-sm">
                      <PackageCheck className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Order Reference
                      </p>
                      <p className="truncate font-mono text-sm font-semibold text-slate-800">
                        #{orderId}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyOrderId}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-medium text-slate-700 border border-slate-200/80 shadow-sm hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-slate-500" />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* What's Next Informational Grid */}
            <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 text-left">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-900">
                    Confirmation Sent
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Check your inbox for full invoice details.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Truck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-900">
                    Fast Shipping
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Tracking details will be shared on dispatch.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex w-full flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 active:scale-[0.98]"
              >
                <ShoppingBag className="h-4 w-4 text-slate-500" />
                Continue Shopping
              </Link>

              {orderId && (
                <Link
                  href={`/orders/${orderId}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 text-sm font-semibold text-white! shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 active:scale-[0.98]"
                >
                  Track Order
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
