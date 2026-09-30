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
import type {
  CreateOnlinePaymentResponse,
  PaymentMethodType,
} from "@/types/payment";

import { useRouter } from "next/navigation";
import { useCreateOrder } from "@/hooks/order/useCreateOrder";
import { useCreatePayment } from "@/hooks/payment/useCreatePayment";
import { useCreateOnlinePayment } from "@/hooks/payment/use-create-online-payment";
import { useVerifyPayment } from "@/hooks/payment/use-verify-payment";

export default function CheckoutPage() {
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();
  const user = currentUser?.data;

  const router = useRouter();

  const createOrder = useCreateOrder();
  const createPayment = useCreatePayment();

  const createOnlinePaymentMutation = useCreateOnlinePayment();
  const verifyPaymentMutation = useVerifyPayment();

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

  const openRazorpay = (payment: CreateOnlinePaymentResponse) => {
    if (typeof window === "undefined" || !window.Razorpay) {
      throw new Error("Razorpay SDK is not loaded");
    }

    const options: RazorpayOptions = {
      key: payment.keyId,
      amount: Math.round(payment.amount * 100),
      currency: payment.currency,
      name: "TechNova",
      description: "TechNova Order",
      order_id: payment.gatewayOrderId,

      handler: async (response) => {
        try {
          await verifyPaymentMutation.mutateAsync({
            paymentId: payment.paymentId,

            data: {
              razorpayPaymentId: response.razorpay_payment_id,

              razorpayOrderId: response.razorpay_order_id,

              razorpaySignature: response.razorpay_signature,
            },
          });

          router.push(`/checkout/success?orderId=${payment.orderId}`);
        } catch (error) {
          console.error("Payment verification failed:", error);
        }
      },

      modal: {
        ondismiss: () => {
          console.log("Razorpay checkout closed");
        },
      },

      theme: {
        color: "#000000",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };

  const handlePlaceOrder = async () => {
    if (
      !selectedAddressId ||
      !selectedShippingMethod ||
      !selectedPaymentMethod
    ) {
      return;
    }

    try {
      const order = await createOrder.mutateAsync({
        addressId: selectedAddressId,
        paymentMethod: selectedPaymentMethod,
        shippingMethod: selectedShippingMethod.method,
      });

      if (selectedPaymentMethod === "COD") {
        await createPayment.mutateAsync({
          orderId: order.id,
          paymentMethod: "COD",
        });

        router.push(`/checkout/success?orderId=${order.id}`);

        return;
      }

      const onlinePayment = await createOnlinePaymentMutation.mutateAsync({
        orderId: order.id,
      });

      openRazorpay(onlinePayment);
    } catch (error) {
      console.error("Place order failed:", error);
    }
  };

  const isPaymentProcessing =
    createOrder.isPending ||
    createPayment.isPending ||
    createOnlinePaymentMutation.isPending ||
    verifyPaymentMutation.isPending;

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
            disabled={isPaymentProcessing}
            onClick={handlePlaceOrder}
          >
            {isPaymentProcessing ? "Processing..." : "Place Order"}
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
