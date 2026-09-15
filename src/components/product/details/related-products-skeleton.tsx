export default function RelatedProductsSkeleton() {
  return (
    <section className="mt-16 border-t border-slate-200/80 pt-12 sm:mt-20 sm:pt-16">
      {/* Header Skeleton */}
      <div className="mb-6 space-y-2 sm:mb-8">
        <div className="h-5 w-28 animate-pulse rounded-full bg-slate-100" />
        <div className="h-8 w-48 animate-pulse rounded-2xl bg-slate-100" />
        <div className="h-4 w-72 animate-pulse rounded-xl bg-slate-100" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-3xl border border-slate-200 bg-white p-3 sm:p-4"
          >
            <div className="aspect-square w-full rounded-2xl bg-slate-100" />

            <div className="mt-3 space-y-2 px-1">
              <div className="h-4 w-full rounded-lg bg-slate-100" />
              <div className="h-4 w-2/3 rounded-lg bg-slate-100" />

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="h-5 w-20 rounded-lg bg-slate-200" />
                <div className="h-8 w-8 rounded-xl bg-slate-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
