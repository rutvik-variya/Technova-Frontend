import type { AdminOrderTimelineItem } from "@/types/admin-order.types";
import { Clock } from "lucide-react";

interface Props {
  timeline: AdminOrderTimelineItem[];
  isLoading: boolean;
  isError: boolean;
}

export default function OrderTimeline({ timeline, isLoading, isError }: Props) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
        <Clock className="h-4 w-4 text-slate-400" />
        <h2 className="text-sm font-bold text-slate-900">Order Timeline</h2>
      </div>

      {isLoading ? (
        <p className="mt-4 text-xs font-medium text-slate-400">
          Loading timeline...
        </p>
      ) : isError ? (
        <p className="mt-4 text-xs font-semibold text-rose-600">
          Unable to load the order timeline.
        </p>
      ) : timeline.length === 0 ? (
        <p className="mt-4 text-xs font-medium text-slate-400">
          No timeline events available.
        </p>
      ) : (
        <div className="mt-5 space-y-5">
          {timeline.map((event) => (
            <div key={event.id} className="border-l-2 border-slate-200 pl-4">
              <p className="text-xs font-bold text-slate-900">
                {event.fromStatus
                  ? `${event.fromStatus} → ${event.toStatus}`
                  : event.toStatus}
              </p>

              {event.note && (
                <p className="mt-1 text-xs text-slate-600">{event.note}</p>
              )}

              <p className="mt-1 text-[11px] font-medium text-slate-400">
                {event.changedBy?.name ?? "System"}
                {" · "}
                {new Date(event.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
