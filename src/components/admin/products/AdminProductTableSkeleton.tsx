export default function AdminProductTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="space-y-0 divide-y divide-gray-100">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 px-5 py-4">
            <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-200" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 max-w-full animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
            </div>

            <div className="hidden h-4 w-20 animate-pulse rounded bg-gray-100 sm:block" />
            <div className="hidden h-6 w-16 animate-pulse rounded-full bg-gray-100 md:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
