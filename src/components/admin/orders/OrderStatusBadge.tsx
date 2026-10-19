import { getStatusClass } from "@/app/admin/orders/utils";

interface OrderStatusBadgeProps {
  status: string;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(status)}`}
    >
      {status}
    </span>
  );
}
