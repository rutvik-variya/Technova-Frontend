"use client";

interface CheckoutPaymentErrorProps {
  error: Error | null;
}

export function CheckoutPaymentError({ error }: CheckoutPaymentErrorProps) {
  if (!error) {
    return null;
  }

  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-4">
      <p className="text-sm text-red-600">
        {error.message || "Payment could not be completed. Please try again."}
      </p>
    </div>
  );
}
