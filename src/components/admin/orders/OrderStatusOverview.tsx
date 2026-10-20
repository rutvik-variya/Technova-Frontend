import type {
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
} from "@/types/admin-order.types";
import OrderStatusBadge from "./OrderStatusBadge";

interface Props {
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
}

export default function OrderStatusOverview({
  status,
  paymentStatus,
  paymentMethod,
}: Props) {
  const cards = [
    { label: "Order Status", value: status, badge: true },
    { label: "Payment Status", value: paymentStatus, badge: true },
    { label: "Payment Method", value: paymentMethod, badge: false },
  ];

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs"
        >
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            {card.label}
          </p>
          <div className="mt-3">
            {card.badge ? (
              <OrderStatusBadge status={card.value} />
            ) : (
              <p className="text-sm font-extrabold text-slate-900">
                {card.value}
              </p>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
