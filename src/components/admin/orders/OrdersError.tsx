import { AlertCircle, RefreshCw } from "lucide-react";

interface OrdersErrorProps {
  message: string;
  onRetry: () => void;
}

export default function OrdersError({ message, onRetry }: OrdersErrorProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-rose-50/70 p-8 text-center sm:p-12 shadow-xs">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
        <AlertCircle className="h-6 w-6" />
      </div>

      <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
        Failed to load orders
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-600">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
      >
        <RefreshCw className="h-4 w-4" />
        <span>Try again</span>
      </button>
    </div>
  );
}
