import { Suspense } from "react";

import ProtectedRoute from "@/components/auth/protected-route";
import CheckoutSuccessPage from "@/components/checkout/checkout-success";

export default function CheckoutSuccess() {
  return (
    <ProtectedRoute>
      <Suspense
        fallback={
          <main className="flex min-h-[85vh] items-center justify-center bg-slate-50/50 text-sm text-slate-500">
            Loading order details...
          </main>
        }
      >
        <CheckoutSuccessPage />
      </Suspense>
    </ProtectedRoute>
  );
}