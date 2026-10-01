import type { CreateOnlinePaymentResponse } from "@/types/payment";

export const openRazorpayCheckout = (
    payment: CreateOnlinePaymentResponse,
    onSuccess: (response: RazorpayPaymentResponse) => Promise<void>,
    onDismiss?: () => void,
) => {
    if (typeof window === "undefined" || !window.Razorpay) {
        throw new Error("Razorpay SDK is not loaded");
    }

    const options: RazorpayOptions = {
        key: payment.keyId,

        amount: Math.round(Number(payment.amount) * 100),

        currency: payment.currency,

        name: "TechNova",

        description: "TechNova Order",

        order_id: payment.gatewayOrderId,

        handler: async (response) => {
            await onSuccess(response);
        },

        modal: {
            ondismiss: onDismiss,
        },

        theme: {
            color: "#000000",
        },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
};