import Link from "next/link";
import { Loader2 } from "lucide-react";

interface FormActionsProps {
  submitLabel: string;
  isSubmitting: boolean;
  cancelHref: string;
}

export default function FormActions({
  submitLabel,
  isSubmitting,
  cancelHref,
}: FormActionsProps) {
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
      <Link
        href={cancelHref}
        className="inline-flex items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 active:scale-[0.98]"
      >
        Cancel
      </Link>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Saving...</span>
          </>
        ) : (
          submitLabel
        )}
      </button>
    </div>
  );
}
