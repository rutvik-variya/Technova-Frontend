export default function ProductDetailsSkeleton() {
  return (
    <section className="mx-auto max-w-7xl animate-pulse px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Gallery Skeleton */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-square w-full rounded-3xl bg-slate-100" />
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-2xl bg-slate-100"
              />
            ))}
          </div>
        </div>

        {/* Info Skeleton */}
        <div className="lg:col-span-5 space-y-6">
          <div className="h-5 w-28 rounded-full bg-slate-200" />
          <div className="h-9 w-4/5 rounded-xl bg-slate-200" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-slate-100" />
            <div className="h-4 w-3/4 rounded bg-slate-100" />
          </div>
          <div className="h-10 w-36 rounded-xl bg-slate-200" />
          <div className="h-px w-full bg-slate-100" />
          <div className="space-y-3">
            <div className="h-4 w-20 rounded bg-slate-100" />
            <div className="flex gap-2">
              <div className="h-10 w-20 rounded-xl bg-slate-200" />
              <div className="h-10 w-20 rounded-xl bg-slate-200" />
              <div className="h-10 w-20 rounded-xl bg-slate-200" />
            </div>
          </div>
          <div className="h-12 w-full rounded-2xl bg-slate-200" />
          <div className="h-12 w-full rounded-2xl bg-slate-200" />
        </div>
      </div>
    </section>
  );
}
