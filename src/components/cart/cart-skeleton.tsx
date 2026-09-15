export function CartSkeleton() {
  return (
    <section className="container py-8 sm:py-10 lg:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />

        <div className="mt-3 h-4 w-32 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
        {/* Items */}
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-xl border bg-card p-4">
              <div className="flex gap-4">
                <div className="h-24 w-24 shrink-0 animate-pulse rounded-lg bg-muted sm:h-32 sm:w-32" />

                <div className="flex-1 space-y-3">
                  <div className="h-3 w-16 animate-pulse rounded bg-muted" />

                  <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />

                  <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />

                  <div className="h-5 w-24 animate-pulse rounded bg-muted" />

                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="rounded-xl border bg-card p-5 sm:p-6">
          <div className="h-6 w-32 animate-pulse rounded bg-muted" />

          <div className="mt-6 space-y-5">
            <div className="flex justify-between">
              <div className="h-4 w-16 animate-pulse rounded bg-muted" />
              <div className="h-4 w-12 animate-pulse rounded bg-muted" />
            </div>

            <div className="flex justify-between">
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between">
                <div className="h-5 w-16 animate-pulse rounded bg-muted" />
                <div className="h-6 w-28 animate-pulse rounded bg-muted" />
              </div>
            </div>

            <div className="h-12 w-full animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
      </div>
    </section>
  );
}
