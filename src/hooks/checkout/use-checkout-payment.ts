"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useCreateOrder } from "@/hooks/order/useCreateOrder";
import { useCreatePayment } from "@/hooks/payment/useCreatePayment";
import { useCreateOnlinePayment } from "@/hooks/payment/use-create-online-payment";
import { useVerifyPayment } from "@/hooks/payment/use-verify-payment";

import type {
    CreateOnlinePaymentResponse,
    PaymentMethodType,
} from "@/types/payment";

import type { ShippingMethod } from "@/types/shipping";
import { openRazorpayCheckout } from "@/services/razorpay.service";

interface UseCheckoutPaymentParams {
    addressId?: string;
    shippingMethod: ShippingMethod | null;
    paymentMethod: PaymentMethodType | null;
}

export const useCheckoutPayment = ({
    addressId,
    shippingMethod,
    paymentMethod,
}: UseCheckoutPaymentParams) => {
    const router = useRouter();

    const createOrder = useCreateOrder();
    const createPayment = useCreatePayment();
    const createOnlinePaymentMutation = useCreateOnlinePayment();
    const verifyPaymentMutation = useVerifyPayment();

    const isProcessing =
        createOrder.isPending ||
        createPayment.isPending ||
        createOnlinePaymentMutation.isPending ||
        verifyPaymentMutation.isPending;

    const handleOnlinePaymentSuccess = async (
        payment: CreateOnlinePaymentResponse,
        response: RazorpayPaymentResponse,
    ) => {
        try {
            await verifyPaymentMutation.mutateAsync({
                paymentId: payment.paymentId,

                data: {
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                },
            });
            
            router.push(
                `/checkout/success?orderId=${payment.orderId}`,
            );
        } catch (error: unknown) {
            const typedError = error as {
                response?: {
                    data?: {
                        message?: unknown;
                    };
                };
                message?: unknown;
            };

            const message =
                typeof typedError.response?.data?.message === "string"
                    ? typedError.response.data.message
                    : typeof typedError.message === "string"
                        ? typedError.message
                        : "Payment verification failed. Please contact support.";

            toast.error(message);

            console.error(
                "Payment verification failed:",
                error,
            );
        }
    };

    const openOnlinePayment = (
        payment: CreateOnlinePaymentResponse,
    ) => {
        openRazorpayCheckout(
            payment,
            (response: RazorpayPaymentResponse) =>
                handleOnlinePaymentSuccess(payment, response),
            () => {
                // Razorpay was closed by the customer.
            },
        );
    };

    const placeOrder = async () => {
        if (
            !addressId ||
            !shippingMethod ||
            !paymentMethod ||
            isProcessing
        ) {
            return;
        }

        try {
            const order = await createOrder.mutateAsync({
                addressId,
                paymentMethod,
                shippingMethod: shippingMethod.method,
            });

            if (paymentMethod === "COD") {
                await createPayment.mutateAsync({
                    orderId: order.id,
                    paymentMethod: "COD",
                });

                router.push(
                    `/checkout/success?orderId=${order.id}`,
                );

                return;
            }

            const onlinePayment =
                await createOnlinePaymentMutation.mutateAsync({
                    orderId: order.id,
                });

            openOnlinePayment(onlinePayment);
        } catch (error: unknown) {
            const typedError = error as {
                response?: {
                    data?: {
                        message?: unknown;
                    };
                };
                message?: unknown;
            };

            const message =
                typeof typedError.response?.data?.message === "string"
                    ? typedError.response.data.message
                    : typeof typedError.message === "string"
                        ? typedError.message
                        : "Unable to initiate payment. Please try again.";

            toast.error(message);

            console.error("Place order failed:", error);
        }
    };

    return {
        placeOrder,
        isProcessing,

        createOrder,
        createPayment,
        createOnlinePaymentMutation,
        verifyPaymentMutation,
    };
};