import ProtectedRoute from "@/components/auth/protected-route";
import OrdersPage from "@/components/orders/orders-page";

export default function Orders() {
  return (
    <ProtectedRoute>
      <OrdersPage />
    </ProtectedRoute>
  );
}
