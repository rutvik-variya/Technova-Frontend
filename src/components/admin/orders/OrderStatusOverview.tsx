
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
        { label: "Order status", value: status, badge: true },
        { label: "Payment status", value: paymentStatus, badge: true },
        { label: "Payment method", value: paymentMethod, badge: false },
    ];

    return (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {cards.map((card) => (
                <div
                    key={card.label}
                    className="rounded-xl border border-gray-200 bg-white p-5"
                >
                    <p className="text-sm text-gray-500">{card.label}</p>
                    <div className="mt-3">
                        {card.badge ? (
                            <OrderStatusBadge status={card.value} />
                        ) : (
                            <p className="font-semibold text-gray-900">
                                {card.value}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </section>
    );
}
