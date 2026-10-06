import { CheckCircle2, ShieldCheck } from "lucide-react";

interface ProfileHeaderProps {
  name?: string;
  email?: string;
  role?: string;
}

export default function ProfileHeader({
  name,
  email,
  role,
}: ProfileHeaderProps) {
  const getInitials = (value?: string) => {
    if (!value) {
      return "TN";
    }

    return value
      .split(" ")
      .map((item) => item[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
      <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-600/5 blur-2xl" />

      <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-xl font-black text-white shadow-md shadow-slate-900/10">
            {getInitials(name)}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                {name || "TechNova Member"}
              </h1>

              <CheckCircle2 className="h-5 w-5 text-blue-600" />
            </div>

            <p className="text-xs text-slate-500">{email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
            <ShieldCheck className="h-3.5 w-3.5" />

            {role || "CUSTOMER"}
          </span>
        </div>
      </div>
    </div>
  );
}
