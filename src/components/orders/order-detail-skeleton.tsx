export default function OrderDetailSkeleton() {
  return (
    <main className="min-h-screen bg-slate-50/50 pb-16 pt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="h-4 w-28 rounded bg-slate-200" />

        <div className="mt-4 flex justify-between items-center border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="h-3 w-20 rounded bg-slate-200" />
            <div className="h-7 w-48 rounded bg-slate-200" />
            <div className="h-4 w-36 rounded bg-slate-200" />
          </div>
          <div className="h-8 w-28 rounded-full bg-slate-200" />
        </div>

        <div className="mt-8 h-28 rounded-2xl bg-slate-200/80" />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="h-64 rounded-2xl bg-slate-200/80" />
          </div>
          <div className="space-y-6">
            <div className="h-44 rounded-2xl bg-slate-200/80" />
            <div className="h-48 rounded-2xl bg-slate-200/80" />
          </div>
        </div>
      </div>
    </main>
  );
}
