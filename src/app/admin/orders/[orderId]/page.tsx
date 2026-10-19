"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import {
  useAdminOrderDetails,
  useAdminOrderTimeline,
} from "@/hooks/admin/useAdminOrders";
import OrderDetailsHeader from "@/components/admin/orders/OrderDetailsHeader";
import OrderStatusOverview from "@/components/admin/orders/OrderStatusOverview";
import OrderAddressCard from "@/components/admin/orders/OrderAddressCard";
import OrderItemsTable from "@/components/admin/orders/OrderItemsTable";
import OrderTimeline from "@/components/admin/orders/OrderTimeline";
import OrderSummaryCard from "@/components/admin/orders/OrderSummaryCard";

export default function AdminOrderDetailsPage() {
  const { orderId } = useParams<{ orderId: string }>();

  const {
    data: order,
    isLoading,
    isError,
    error,
    refetch,
  } = useAdminOrderDetails(orderId);

  const {
    data: timeline,
    isLoading: isTimelineLoading,
    isError: isTimelineError,
  } = useAdminOrderTimeline(orderId);

  if (isLoading) {
    return (
      <div className="p-8 text-sm text-gray-500">Loading order details...</div>
    );
  }

  if (isError || !order) {
    return (
      <div className="space-y-4 p-8">
        <p className="text-sm text-red-600">
          {error instanceof Error
            ? error.message
            : "Unable to load order details."}
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
        >
          Try again
        </button>

        <div>
          <Link href="/admin/orders" className="text-sm underline">
            Back to orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <OrderDetailsHeader
        orderNumber={order.orderNumber}
        createdAt={order.createdAt}
      />

      <OrderStatusOverview
        status={order.status}
        paymentStatus={order.paymentStatus}
        paymentMethod={order.paymentMethod}
      />

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-6">
          <OrderAddressCard address={order.address} />
          <OrderItemsTable items={order.items} />
          <OrderTimeline
            timeline={timeline ?? []}
            isLoading={isTimelineLoading}
            isError={isTimelineError}
          />
        </div>

        <OrderSummaryCard
          subtotal={Number(order.subtotal)}
          discount={Number(order.discount)}
          shippingCharge={Number(order.shippingCharge)}
          tax={Number(order.tax)}
          grandTotal={Number(order.grandTotal)}
        />
      </div>
    </div>
  );
}
