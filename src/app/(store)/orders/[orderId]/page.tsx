import ProtectedRoute from "@/components/auth/protected-route";
import OrderDetailPage from "@/components/orders/order-detail-page";

interface OrderDetailRouteProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function OrderDetailRoute({
  params,
}: OrderDetailRouteProps) {
  const { orderId } = await params;

  return (
    <ProtectedRoute>
      <OrderDetailPage orderId={orderId} />
    </ProtectedRoute>
  );
}
