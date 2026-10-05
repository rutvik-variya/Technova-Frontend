import { AlertTriangle, RefreshCw } from "lucide-react";

interface OrderErrorProps {
  message?: string;
  onRetry?: () => void;
}

export default function OrderError({ message, onRetry }: OrderErrorProps) {
  return (
    <div className="rounded-2xl border border-rose-200/80 bg-rose-50/60 p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h2 className="text-base font-semibold text-rose-900">
            Unable to load orders
          </h2>
          <p className="mt-1 text-sm text-rose-700 leading-relaxed">
            {message ||
              "Something went wrong while fetching your order history. Please try again."}
          </p>

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-rose-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-rose-800 active:scale-95"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
