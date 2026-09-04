export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="aspect-square animate-pulse bg-slate-200" />

      <div className="space-y-3 p-4">
        <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />

        <div className="h-5 w-full animate-pulse rounded bg-slate-200" />

        <div className="h-6 w-24 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}
