import ProtectedRoute from "@/components/auth/protected-route";
import CheckOutPage from "@/components/checkout/checkout-page";
import Script from "next/script";

export default function CheckOut() {
  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <ProtectedRoute>
        <CheckOutPage />
      </ProtectedRoute>
    </>
  );
}
