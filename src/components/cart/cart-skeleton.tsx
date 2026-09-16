export function CartSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Header Skeleton */}
      <div className="mb-8 space-y-2 border-b border-slate-200/80 pb-6">
        <div className="h-8 w-48 animate-pulse rounded-2xl bg-slate-100" />
        <div className="h-4 w-32 animate-pulse rounded-lg bg-slate-100" />
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Cart Items Skeleton */}
        <div className="space-y-4 lg:col-span-7 xl:col-span-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-3xl border border-slate-200 bg-white p-4 sm:p-5"
            >
              <div className="flex gap-4 sm:gap-6">
                <div className="h-24 w-24 shrink-0 rounded-2xl bg-slate-100 sm:h-32 sm:w-32" />

                <div className="flex-1 space-y-3">
                  <div className="h-3 w-16 rounded-md bg-slate-100" />
                  <div className="h-5 w-3/4 rounded-xl bg-slate-100" />
                  <div className="flex gap-2">
                    <div className="h-4 w-16 rounded-md bg-slate-100" />
                    <div className="h-4 w-16 rounded-md bg-slate-100" />
                  </div>
                  <div className="mt-4 flex justify-between border-t border-slate-100 pt-3">
                    <div className="h-7 w-24 rounded-2xl bg-slate-100" />
                    <div className="h-5 w-16 rounded-md bg-slate-100" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Skeleton */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-5 xl:col-span-4">
          <div className="h-6 w-32 animate-pulse rounded-xl bg-slate-100" />

          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <div className="h-4 w-20 animate-pulse rounded-lg bg-slate-100" />
              <div className="h-4 w-12 animate-pulse rounded-lg bg-slate-100" />
            </div>

            <div className="flex justify-between">
              <div className="h-4 w-24 animate-pulse rounded-lg bg-slate-100" />
              <div className="h-4 w-20 animate-pulse rounded-lg bg-slate-100" />
            </div>

            <div className="border-t border-slate-100 pt-4">
              <div className="flex justify-between items-baseline">
                <div className="h-5 w-16 animate-pulse rounded-lg bg-slate-100" />
                <div className="h-7 w-28 animate-pulse rounded-2xl bg-slate-200" />
              </div>
            </div>

            <div className="h-12 w-full animate-pulse rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>
    </section>
  );
}
