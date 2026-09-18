export function WishlistSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8 space-y-2 border-b border-slate-200/80 pb-6">
        <div className="h-8 w-48 animate-pulse rounded-2xl bg-slate-100" />
        <div className="h-4 w-28 animate-pulse rounded-lg bg-slate-100" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-3xl border border-slate-200 bg-white p-4 sm:p-5"
          >
            <div className="aspect-square w-full rounded-2xl bg-slate-100" />

            <div className="mt-4 space-y-3">
              <div className="h-3 w-16 rounded-md bg-slate-100" />
              <div className="h-5 w-full rounded-xl bg-slate-100" />
              <div className="h-6 w-24 rounded-lg bg-slate-100" />

              <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
                <div className="h-9 flex-1 rounded-2xl bg-slate-100" />
                <div className="h-9 w-9 rounded-2xl bg-slate-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
