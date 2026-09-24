export function AddressListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-xl border border-gray-200 p-4"
        >
          <div className="h-5 w-40 rounded bg-gray-200" />

          <div className="mt-4 space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-2/3 rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
