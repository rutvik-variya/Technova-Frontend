interface FormActionsProps {
  submitLabel: string;
  isSubmitting: boolean;
  cancelHref: string;
}

import Link from "next/link";

export default function FormActions({
  submitLabel,
  isSubmitting,
  cancelHref,
}: FormActionsProps) {
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
      <Link
        href={cancelHref}
        className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Cancel
      </Link>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </div>
  );
}
