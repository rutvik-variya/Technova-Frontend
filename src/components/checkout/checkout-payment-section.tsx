"use client";

import type { PaymentMethodType } from "@/types/payment";

interface CheckoutPaymentSectionProps {
  selectedMethod: PaymentMethodType | null;
  onPaymentSelect: (method: PaymentMethodType) => void;
}

const PAYMENT_METHODS: {
  value: PaymentMethodType;
  label: string;
  description: string;
}[] = [
  {
    value: "ONLINE",
    label: "Online Payment",
    description:
      "Pay securely using your card or available online payment options.",
  },
  {
    value: "COD",
    label: "Cash on Delivery",
    description: "Pay when your order is delivered.",
  },
];

export function CheckoutPaymentSection({
  selectedMethod,
  onPaymentSelect,
}: CheckoutPaymentSectionProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-4 sm:px-6">
        <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
      </div>

      <div className="space-y-3 p-5 sm:p-6">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.value;

          return (
            <label
              key={method.value}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50/40"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.value}
                checked={isSelected}
                onChange={() => onPaymentSelect(method.value)}
                className="mt-1 h-4 w-4 accent-indigo-600"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-gray-900">
                    {method.label}
                  </span>

                  {method.value === "ONLINE" && (
                    <span className="rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
                      Card / Online
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm leading-5 text-gray-500">
                  {method.description}
                </p>

                {method.value === "ONLINE" && isSelected && (
                  <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
                    <p className="text-sm font-medium text-gray-800">
                      Secure online payment
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Your payment will be completed through the payment gateway
                      after you place your order.
                    </p>
                  </div>
                )}

                {method.value === "COD" && isSelected && (
                  <div className="mt-4 rounded-lg bg-gray-50 p-3">
                    <p className="text-xs leading-5 text-gray-600">
                      You will pay for your order when it is delivered.
                    </p>
                  </div>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
