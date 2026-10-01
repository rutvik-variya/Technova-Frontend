"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <main className="min-h-[70vh] bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        {/* Success Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" strokeWidth={2} />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Order placed successfully!
        </h1>

        {/* Description */}
        <p className="mt-3 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
          Thank you for your purchase. Your order has been successfully placed
          and we&apos;ll process it shortly.
        </p>

        {/* Order ID */}
        {orderId && (
          <div className="mt-6 w-full rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Order ID
            </p>

            <p className="mt-1 break-all text-sm font-medium text-gray-900">
              {orderId}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-md bg-black px-6 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
