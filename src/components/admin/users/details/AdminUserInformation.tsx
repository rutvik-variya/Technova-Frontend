import type { AdminUserDetails } from "@/types/admin-user.types";
import { ShieldCheck } from "lucide-react";

interface AdminUserInformationProps {
  user: AdminUserDetails;
}

const formatDateTime = (date: string) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

export default function AdminUserInformation({
  user,
}: AdminUserInformationProps) {
  const fields = [
    { label: "User ID", value: user.id },
    { label: "Full Name", value: user.name },
    { label: "Email Address", value: user.email },
    { label: "Role", value: user.role },
    {
      label: "Registered On",
      value: formatDateTime(user.createdAt),
    },
    {
      label: "Last Updated",
      value: formatDateTime(user.updatedAt),
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
        <ShieldCheck className="h-4 w-4 text-slate-400" />
        <h2 className="text-sm font-bold text-slate-900">
          Account Information
        </h2>
      </div>

      <dl className="mt-4 divide-y divide-slate-100">
        {fields.map((field) => (
          <div
            key={field.label}
            className="grid gap-1 py-3.5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-4"
          >
            <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {field.label}
            </dt>

            <dd className="break-all text-xs font-bold text-slate-900">
              {field.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
