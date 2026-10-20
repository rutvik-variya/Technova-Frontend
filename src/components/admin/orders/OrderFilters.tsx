"use client";

interface OrderFiltersProps {
  searchInput: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPaymentStatusChange: (value: string) => void;
  onPaymentMethodChange: (value: string) => void;
  onReset: () => void;
}

const labelClass =
  "block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5";

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900";

const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
];

const PAYMENT_METHODS = ["COD", "ONLINE"];
const PAYMENT_STATUSES = [
  "PENDING",
  "PROCESSING",
  "PAID",
  "FAILED",
  "CANCELLED",
  "REFUNDED",
];

export default function OrderFilters({
  searchInput,
  status,
  paymentStatus,
  paymentMethod,
  onSearchChange,
  onStatusChange,
  onPaymentStatusChange,
  onPaymentMethodChange,
  onReset,
}: OrderFiltersProps) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div>
          <label htmlFor="order-search" className={labelClass}>
            Search Order
          </label>
          <input
            id="order-search"
            type="search"
            value={searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Enter order number..."
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="order-status" className={labelClass}>
            Order Status
          </label>
          <select
            id="order-status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className={inputClass}
          >
            <option value="">All statuses</option>
            {ORDER_STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="payment-status" className={labelClass}>
            Payment Status
          </label>
          <select
            id="payment-status"
            value={paymentStatus}
            onChange={(e) => onPaymentStatusChange(e.target.value)}
            className={inputClass}
          >
            <option value="">All payment statuses</option>
            {PAYMENT_STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="payment-method" className={labelClass}>
            Payment Method
          </label>
          <select
            id="payment-method"
            value={paymentMethod}
            onChange={(e) => onPaymentMethodChange(e.target.value)}
            className={inputClass}
          >
            <option value="">All payment methods</option>
            {PAYMENT_METHODS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex justify-end border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-bold text-slate-500 underline underline-offset-4 hover:text-slate-900 transition-colors"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
