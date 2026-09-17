export function WishlistSkeleton() {
  return (
    <section className="container py-8 sm:py-10 lg:py-12">
      <div className="mb-8 space-y-2">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-4 w-28 animate-pulse rounded bg-muted" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="rounded-2xl border p-4">
            <div className="aspect-square animate-pulse rounded-xl bg-muted" />

            <div className="mt-4 space-y-3">
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
              <div className="h-5 w-full animate-pulse rounded bg-muted" />
              <div className="h-5 w-24 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
