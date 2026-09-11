export default function RelatedProductsSkeleton() {
  return (
    <section className="mt-16">
      <div className="mb-6">
        <div className="h-7 w-48 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-4 w-72 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <div className="aspect-square animate-pulse bg-slate-200" />

            <div className="space-y-3 p-4">
              <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />

              <div className="h-5 w-full animate-pulse rounded bg-slate-200" />

              <div className="h-5 w-24 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
