export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-4 shadow-xs">
      <div className="aspect-square w-full animate-pulse rounded-2xl bg-slate-100" />
      <div className="mt-4 flex flex-col gap-2">
        <div className="h-3 w-1/3 animate-pulse rounded-full bg-slate-100" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-100" />
        <div className="mt-2 flex items-center justify-between">
          <div className="h-6 w-1/2 animate-pulse rounded-full bg-slate-100" />
          <div className="h-8 w-20 animate-pulse rounded-xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
