import type { AdminOrderTimelineItem } from "@/types/admin-order.types";

interface Props {
  timeline: AdminOrderTimelineItem[];
  isLoading: boolean;
  isError: boolean;
}

export default function OrderTimeline({ timeline, isLoading, isError }: Props) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="font-semibold text-gray-900">Order timeline</h2>

      {isLoading ? (
        <p className="mt-4 text-sm text-gray-500">Loading timeline...</p>
      ) : isError ? (
        <p className="mt-4 text-sm text-red-600">
          Unable to load the order timeline.
        </p>
      ) : timeline.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">
          No timeline events available.
        </p>
      ) : (
        <div className="mt-5 space-y-5">
          {timeline.map((event) => (
            <div key={event.id} className="border-l-2 border-gray-200 pl-4">
              <p className="font-medium text-gray-900">
                {event.fromStatus
                  ? `${event.fromStatus} → ${event.toStatus}`
                  : event.toStatus}
              </p>

              {event.note && (
                <p className="mt-1 text-sm text-gray-600">{event.note}</p>
              )}

              <p className="mt-1 text-xs text-gray-500">
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
