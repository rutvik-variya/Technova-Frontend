import { Mail, ShieldCheck, User } from "lucide-react";

interface ProfilePersonalInfoProps {
  name?: string;
  email?: string;
  role?: string;
}

export default function ProfilePersonalInfo({
  name,
  email,
  role,
}: ProfilePersonalInfoProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
      <h2 className="text-base font-bold text-slate-900">
        Personal Information
      </h2>

      <p className="mt-0.5 text-xs text-slate-500">
        Manage your personal details and account settings.
      </p>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-600 shadow-xs">
            <User className="h-5 w-5" />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Full Name
            </span>

            <p className="text-sm font-semibold text-slate-900">
              {name || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-600 shadow-xs">
            <Mail className="h-5 w-5" />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Email Address
            </span>

            <p className="text-sm font-semibold text-slate-900">
              {email || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-600 shadow-xs">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Account Role
            </span>

            <p className="text-sm font-semibold capitalize text-slate-900">
              {role?.toLowerCase() || "customer"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
