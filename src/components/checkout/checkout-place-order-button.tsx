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
      className="w-full rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isProcessing ? "Processing..." : "Place Order"}
    </button>
  );
}
