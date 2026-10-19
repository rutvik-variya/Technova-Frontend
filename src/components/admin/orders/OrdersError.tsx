interface OrdersErrorProps {
  message: string;
  onRetry: () => void;
}

export default function OrdersError({ message, onRetry }: OrdersErrorProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6">
      <p className="font-medium text-red-700">Failed to load orders.</p>
      <p className="mt-1 text-sm text-red-600">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}
