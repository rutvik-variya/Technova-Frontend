export default function OrdersLoading() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xs animate-pulse">
      <div className="space-y-4">
        <div className="h-8 w-48 rounded-xl bg-slate-200" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 border-b border-slate-100 py-3"
          >
            <div className="h-4 w-32 rounded-lg bg-slate-200" />
            <div className="h-4 w-40 rounded-lg bg-slate-100" />
            <div className="h-6 w-24 rounded-full bg-slate-200" />
            <div className="h-4 w-20 rounded-lg bg-slate-100" />
            <div className="h-4 w-16 rounded-lg bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
