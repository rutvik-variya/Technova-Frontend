import type { LucideIcon } from "lucide-react";

interface AdminStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: string;
}

export default function AdminStatsCard({
  title,
  value,
  icon: Icon,
  description,
}: AdminStatsCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>

          {description && (
            <p className="mt-1 text-xs text-slate-500 font-medium">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 shadow-sm transition-colors group-hover:bg-slate-900 group-hover:text-white">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
