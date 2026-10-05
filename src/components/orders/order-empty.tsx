import Link from "next/link";

export default function OrderEmpty() {
  return (
    <div className="rounded-lg border bg-white px-6 py-12 text-center">
      <h2 className="text-lg font-semibold">No orders yet</h2>

      <p className="mt-2 text-sm text-gray-500">
        You haven&apos;t placed any orders yet.
      </p>

      <Link
        href="/products"
        className="mt-6 inline-flex rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
      >
        Start Shopping
      </Link>
    </div>
  );
}
