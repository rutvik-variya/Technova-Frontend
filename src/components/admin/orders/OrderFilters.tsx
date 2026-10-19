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

const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-900";

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
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div>
          <label htmlFor="order-search" className={labelClass}>
            Search order
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
            Order status
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
            Payment status
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
            Payment method
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

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-gray-600 underline underline-offset-4 hover:text-gray-900"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
