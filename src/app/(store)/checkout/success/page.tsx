import ProtectedRoute from "@/components/auth/protected-route";
import CheckoutSuccessPage from "@/components/checkout/checkout-success";

export default function CheckoutSuccess() {
  return (
    <ProtectedRoute>
      <CheckoutSuccessPage />
    </ProtectedRoute>
  );
}