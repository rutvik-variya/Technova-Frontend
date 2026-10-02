"use client";

import { CreditCard, Banknote, ShieldCheck } from "lucide-react";
import type { PaymentMethodType } from "@/types/payment";

interface CheckoutPaymentSectionProps {
  selectedPaymentMethod: PaymentMethodType | null;
  onPaymentMethodChange: (method: PaymentMethodType) => void;
  onPlaceOrder: () => void;
  isProcessing: boolean;
}

const PAYMENT_METHODS: {
  value: PaymentMethodType;
  label: string;
  description: string;
  icon: typeof CreditCard;
}[] = [
  {
    value: "ONLINE",
    label: "Online Payment",
    description: "Pay securely using Card, UPI, Netbanking or Wallet.",
    icon: CreditCard,
  },
  {
    value: "COD",
    label: "Cash on Delivery",
    description: "Pay with cash or UPI when your order is delivered.",
    icon: Banknote,
  },
];

export function CheckoutPaymentSection({
  selectedPaymentMethod,
  onPaymentMethodChange,
}: CheckoutPaymentSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all sm:p-6 md:p-7">
      <div className="flex items-start gap-3 border-b border-slate-100 pb-5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold tracking-wider text-slate-700">
          03
        </span>
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
            Payment Method
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
            Select your preferred secure payment mode.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3.5">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedPaymentMethod === method.value;
          const Icon = method.icon;

          return (
            <label
              key={method.value}
              className={`flex cursor-pointer flex-col rounded-2xl border p-4.5 transition-all duration-200 sm:p-5 ${
                isSelected
                  ? "border-slate-900 bg-slate-900/[0.02] ring-1 ring-slate-900 shadow-xs"
                  : "border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xs"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.value}
                  checked={isSelected}
                  onChange={() => onPaymentMethodChange(method.value)}
                  className="mt-1 h-4 w-4 accent-slate-900 focus:ring-slate-900"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-slate-700" />
                      <span className="text-sm font-bold text-slate-900 sm:text-base">
                        {method.label}
                      </span>
                    </div>

                    {method.value === "ONLINE" && (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 sm:text-xs">
                        Instant
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    {method.description}
                  </p>

                  {method.value === "ONLINE" && isSelected && (
                    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                      <div className="flex items-center gap-2 text-slate-900">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                        <p className="text-xs font-bold sm:text-sm">
                          Encrypted 256-bit SSL Checkout
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                        You will be redirected to our PCI-DSS compliant payment
                        gateway to complete your payment securely.
                      </p>
                    </div>
                  )}

                  {method.value === "COD" && isSelected && (
                    <div className="mt-4 rounded-xl border border-slate-200/60 bg-slate-50 p-3.5">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Please keep the exact cash amount or UPI ready at the
                        time of delivery.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
