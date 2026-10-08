// AdminPaymentStatusBadge.tsx
interface AdminPaymentStatusBadgeProps {
  status: string;
}

const paymentStatusStyles: Record<string, string> = {
  PAID: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200/60",
  FAILED: "bg-rose-50 text-rose-700 border-rose-200/60",
  REFUNDED: "bg-blue-50 text-blue-700 border-blue-200/60",
};

export default function AdminPaymentStatusBadge({
  status,
}: AdminPaymentStatusBadgeProps) {
  const normalized = status.toUpperCase();
  const styles =
    paymentStatusStyles[normalized] ??
    "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-tight ${styles}`}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
