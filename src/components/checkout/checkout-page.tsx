"use client";

import { useCallback, useState } from "react";

import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useCheckout } from "@/hooks/checkout/use-checkout";

import { CheckoutAddressSection } from "./checkout-address-section";
import { CheckoutOrderSummary } from "./checkout-order-summary";
import CheckoutCoupon from "./checkout-coupon";
import { CheckoutShippingSection } from "./checkout-shipping-section";
import type { ShippingMethod } from "@/types/shipping";

import { CheckoutPaymentSection } from "./checkout-payment-section";
import type { PaymentMethodType } from "@/types/payment";
import { useRouter } from "next/navigation";
import { useCreateOrder } from "@/hooks/order/useCreateOrder";
import { useCreatePayment } from "@/hooks/payment/useCreatePayment";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();
  const user = currentUser?.data;

  const router = useRouter();

  const createOrder = useCreateOrder();
  const createPayment = useCreatePayment();

  const isPlacingOrder = createOrder.isPending || createPayment.isPending;

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
    data: checkout,
    isLoading: isCheckoutLoading,
    isFetching: isCheckoutFetching,
    isError: isCheckoutError,
    refetch: refetchCheckout,
  } = useCheckout(selectedAddressId);

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

  const handlePlaceOrder = () => {
    if (
      !selectedAddressId ||
      !selectedShippingMethod ||
      !selectedPaymentMethod
    ) {
      return;
    }

    createOrder.mutate(
      {
        addressId: selectedAddressId,
        paymentMethod: selectedPaymentMethod,
        shippingMethod: selectedShippingMethod.method,
      },
      {
        onSuccess: (order) => {
          // COD: Create payment after the order is created.
          if (selectedPaymentMethod === "COD") {
            createPayment.mutate(
              {
                orderId: order.id,
                paymentMethod: "COD",
              },
              {
                onSuccess: () => {
                  router.push(`/checkout/success?orderId=${order.id}`);
                },
              },
            );

            return;
          }

          // Online payment will be integrated in Step 9.
          router.push(`/checkout/success?orderId=${order.id}`);
        },
      },
    );
  };

  if (isUserLoading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 w-48 rounded bg-gray-200" />

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="h-96 rounded-2xl bg-gray-100" />
            <div className="h-96 rounded-2xl bg-gray-100" />
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Login required
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Please login to continue checkout.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-gray-500">Checkout</p>

        <h1 className="mt-1 text-2xl font-semibold text-gray-900 sm:text-3xl">
          Complete your order
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* LEFT */}
        <div className="space-y-6">
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
              selectedMethod={selectedPaymentMethod}
              onPaymentSelect={setSelectedPaymentMethod}
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

        {/* RIGHT */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <CheckoutOrderSummary
            checkout={checkout}
            isLoading={isCheckoutLoading}
            isFetching={isCheckoutFetching}
            isError={isCheckoutError}
            onRetry={refetchCheckout}
            couponDiscount={couponDiscount}
            selectedShippingMethod={selectedShippingMethod}
          />

          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={
              isPlacingOrder ||
              !selectedAddressId ||
              !selectedShippingMethod ||
              !selectedPaymentMethod
            }
            className="w-full rounded-lg bg-black px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {createOrder.isPending
              ? "Placing Order..."
              : createPayment.isPending
                ? "Creating COD Payment..."
                : "Place Order"}
          </button>

          {(createOrder.isError || createPayment.isError) && (
            <p className="text-sm text-red-600" role="alert">
              {createPayment.isError
                ? `Order was created, but payment creation failed: ${
                    createPayment.error instanceof Error
                      ? createPayment.error.message
                      : "Please contact support."
                  }`
                : createOrder.error instanceof Error
                  ? createOrder.error.message
                  : "Unable to place your order. Please try again."}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
