"use client";

interface CheckoutPlaceOrderButtonProps {
  onPlaceOrder: () => void;
  isProcessing: boolean;
  disabled?: boolean;
}

export function CheckoutPlaceOrderButton({
  onPlaceOrder,
  isProcessing,
  disabled = false,
}: CheckoutPlaceOrderButtonProps) {
  const isDisabled = disabled || isProcessing;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onPlaceOrder}
      className={`
        relative group w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 
        text-sm font-semibold text-white shadow-sm transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
        ${
          isDisabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
            : "bg-slate-950 hover:bg-slate-800 active:scale-[0.99]"
        }
      `}
    >
      {isProcessing ? (
        <>
          <svg
            className="h-4 w-4 animate-spin text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Processing Order...</span>
        </>
      ) : (
        <>
          <span>Place Order</span>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </>
      )}
    </button>
  );
}
