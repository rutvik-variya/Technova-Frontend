import { getStatusClass } from "@/app/admin/orders/utils";

interface OrderStatusBadgeProps {
  status: string;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-extrabold tracking-tight ${getStatusClass(
        status,
      )}`}
    >
      {status}
    </span>
  );
}
