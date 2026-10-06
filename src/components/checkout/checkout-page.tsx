"use client";

import { useCallback, useState } from "react";
import { ShieldCheck, CreditCard, AlertCircle, Lock } from "lucide-react";

import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useCheckout } from "@/hooks/checkout/use-checkout";

import CheckoutAddressSection from "./checkout-address-section";
import { CheckoutOrderSummary } from "./checkout-order-summary";
import CheckoutCoupon from "./checkout-coupon";
import { CheckoutShippingSection } from "./checkout-shipping-section";
import type { ShippingMethod } from "@/types/shipping";

import { CheckoutPaymentSection } from "./checkout-payment-section";
import type { PaymentMethodType } from "@/types/payment";
import { useCheckoutPayment } from "@/hooks/checkout/use-checkout-payment";
import { CheckoutPlaceOrderButton } from "./checkout-place-order-button";

export default function CheckoutPage() {
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();
  const user = currentUser?.data;

  const [isCheckoutActive, setIsCheckoutActive] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState<string>();
  const [appliedCoupon, setAppliedCoupon] = useState<{
    id: string;
    code: string;
    type: "FIXED" | "PERCENTAGE";
  } | null>(null);

  const [couponDiscount, setCouponDiscount] = useState(0);

  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<ShippingMethod | null>(null);

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethodType | null>(null);

  const {
    placeOrder,
    isProcessing: isPaymentProcessing,
    createOrder,
    createPayment,
    createOnlinePaymentMutation,
    verifyPaymentMutation,
  } = useCheckoutPayment({
    addressId: selectedAddressId,
    shippingMethod: selectedShippingMethod,
    paymentMethod: selectedPaymentMethod,
  });

  const {
    data: checkout,
    isLoading: isCheckoutLoading,
    isFetching: isCheckoutFetching,
    isError: isCheckoutError,
    refetch: refetchCheckout,
  } = useCheckout(selectedAddressId, isCheckoutActive);

  const handleAddressSelect = useCallback(
    (addressId: string) => {
      if (addressId !== selectedAddressId) {
        setSelectedAddressId(addressId);
        setSelectedShippingMethod(null);
        setAppliedCoupon(null);
        setCouponDiscount(0);
      }
    },
    [selectedAddressId],
  );

  const handleShippingSelect = useCallback((method: ShippingMethod) => {
    setSelectedShippingMethod(method);
  }, []);

  const handleCouponApplied = useCallback(
    (data: {
      coupon: {
        id: string;
        code: string;
        type: "FIXED" | "PERCENTAGE";
      };
      discount: number;
      total: number;
    }) => {
      setAppliedCoupon(data.coupon);
      setCouponDiscount(data.discount);
    },
    [],
  );

  const handleCouponRemoved = useCallback(() => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
  }, []);

  const getPaymentErrorMessage = (error: unknown) => {
    if (error instanceof Error && error.message) {
      return error.message;
    }

    return "Payment could not be completed. Please try again.";
  };

  const handlePlaceOrder = async () => {
    setIsCheckoutActive(false);

    await placeOrder();
  };

  // TechNova Loading Skeleton State
  if (isUserLoading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="animate-pulse space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-slate-200" />
            <div className="h-8 w-48 rounded-xl bg-slate-200" />
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="space-y-6 lg:col-span-7 xl:col-span-8">
              <div className="h-64 rounded-3xl border border-slate-200 bg-slate-100/70 p-6" />
              <div className="h-48 rounded-3xl border border-slate-200 bg-slate-100/70 p-6" />
            </div>
            <div className="h-96 rounded-3xl border border-slate-200 bg-slate-100/70 p-6 lg:col-span-5 xl:col-span-4" />
          </div>
        </div>
      </main>
    );
  }

  // TechNova Unauthenticated / Required Login State
  if (!user) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
            <Lock className="h-7 w-7" />
          </div>

          <h1 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
            Login Required
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-500">
            Please log in to your TechNova account to view shipping options and
            complete your checkout.
          </p>
        </div>
      </main>
    );
  }

  const paymentError =
    createOrder.error ||
    createPayment.error ||
    createOnlinePaymentMutation.error ||
    verifyPaymentMutation.error;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 border-b border-slate-200/80 pb-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
            <CreditCard className="h-4 w-4" />
          </span>

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Checkout
          </h1>
        </div>

        <p className="mt-1 text-sm font-medium text-slate-500">
          Complete your delivery details and choose a payment method
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* LEFT COLUMN: Addresses, Shipping, Payment, Coupon */}
        <div className="space-y-6 lg:col-span-7 xl:col-span-8">
          <CheckoutAddressSection
            selectedAddressId={selectedAddressId}
            onAddressSelect={handleAddressSelect}
          />

          {checkout && (
            <CheckoutShippingSection
              subtotal={checkout.totals.subtotal}
              selectedMethodId={selectedShippingMethod?.id}
              onShippingSelect={handleShippingSelect}
            />
          )}

          {checkout && (
            <CheckoutPaymentSection
              selectedPaymentMethod={selectedPaymentMethod}
              onPaymentMethodChange={setSelectedPaymentMethod}
              onPlaceOrder={placeOrder}
              isProcessing={isPaymentProcessing}
            />
          )}

          {selectedAddressId && (
            <CheckoutCoupon
              appliedCoupon={appliedCoupon}
              discount={couponDiscount}
              onCouponApplied={handleCouponApplied}
              onCouponRemoved={handleCouponRemoved}
            />
          )}
        </div>

        {/* RIGHT COLUMN: Order Summary & Action CTAs */}
        <div className="space-y-4 lg:sticky lg:top-24 lg:col-span-5 lg:self-start xl:col-span-4">
          <CheckoutOrderSummary
            checkout={checkout}
            isLoading={isCheckoutLoading}
            isFetching={isCheckoutFetching}
            isError={isCheckoutError}
            onRetry={refetchCheckout}
            couponDiscount={couponDiscount}
            selectedShippingMethod={selectedShippingMethod}
          />

          <CheckoutPlaceOrderButton
            onPlaceOrder={handlePlaceOrder}
            isProcessing={isPaymentProcessing}
            disabled={
              !selectedAddressId ||
              !selectedShippingMethod ||
              !selectedPaymentMethod
            }
          />

          {/* TechNova Style Error Banner */}
          {(createOrder.isError ||
            createPayment.isError ||
            createOnlinePaymentMutation.isError ||
            verifyPaymentMutation.isError) && (
            <div className="relative overflow-hidden rounded-2xl border border-rose-200 bg-rose-50/70 p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-rose-800">
                    Payment Issue
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-rose-700">
                    {getPaymentErrorMessage(paymentError)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TechNova Trust Badge */}
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-3 text-xs font-semibold text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>256-bit Encrypted & Secure Checkout</span>
          </div>
        </div>
      </div>
    </main>
  );
}
