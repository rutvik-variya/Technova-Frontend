import { Suspense } from "react";

import ProductsPageContent from "./products-page-content";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50/60 text-sm text-slate-500">
          Loading products...
        </main>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
