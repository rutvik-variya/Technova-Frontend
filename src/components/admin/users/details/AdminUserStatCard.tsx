interface AdminUserStatCardProps {
  title: string;
  value: number;
  description: string;
}

export default function AdminUserStatCard({
  title,
  value,
  description,
}: AdminUserStatCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
        {title}
      </p>

      <p className="mt-2 text-3xl font-extrabold text-slate-900">{value}</p>

      <p className="mt-1 text-xs font-medium text-slate-500">{description}</p>
    </div>
  );
}