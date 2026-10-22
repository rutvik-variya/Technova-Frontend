export default function AdminShippingLoading() {
  return (
    <main className="space-y-8 animate-pulse" aria-label="Loading shipping methods">
      <div className="flex items-center gap-2.5 border-b border-slate-200/80 pb-6">
        <div className="h-8 w-8 rounded-xl bg-slate-200" />
        <div className="space-y-2">
          <div className="h-7 w-48 rounded-xl bg-slate-200" />
          <div className="h-4 w-64 rounded-lg bg-slate-100" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="h-72 rounded-3xl border border-slate-200/80 bg-slate-100/70 p-6 shadow-xs"
          />
        ))}
      </div>
    </main>
  );
}