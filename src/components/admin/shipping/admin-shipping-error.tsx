import { RefreshCw, Truck } from "lucide-react";

interface AdminShippingErrorProps {
  onRetry: () => void;
  isRetrying?: boolean;
}

export default function AdminShippingError({
  onRetry,
  isRetrying = false,
}: AdminShippingErrorProps) {
  return (
    <main className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-rose-50/70 p-8 text-center sm:p-12 shadow-xs">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
          <Truck className="h-6 w-6" />
        </div>

        <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
          Could Not Load Shipping Methods
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-600">
          Check your network connection and try again.
        </p>

        <button
          type="button"
          onClick={onRetry}
          disabled={isRetrying}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`} />
          <span>{isRetrying ? "Retrying..." : "Try Again"}</span>
        </button>
      </div>
    </main>
  );
}