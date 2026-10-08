// AdminOrderStatusBadge.tsx
interface AdminOrderStatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200/60",
  CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200/60",
  PROCESSING: "bg-purple-50 text-purple-700 border-purple-200/60",
  SHIPPED: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
  DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  CANCELLED: "bg-rose-50 text-rose-700 border-rose-200/60",
  RETURNED: "bg-orange-50 text-orange-700 border-orange-200/60",
};

export default function AdminOrderStatusBadge({
  status,
}: AdminOrderStatusBadgeProps) {
  const normalized = status.toUpperCase();
  const styles =
    statusStyles[normalized] ?? "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-tight ${styles}`}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
