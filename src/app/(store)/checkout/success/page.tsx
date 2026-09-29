import Link from "next/link";

interface CheckoutSuccessPageProps {
  searchParams: Promise<{
    orderId?: string;
  }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const { orderId } = await searchParams;

  return (
    <main className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
          ✓
        </div>

        <h1 className="mb-3 text-2xl font-bold text-gray-900">
          Order Placed Successfully!
        </h1>

        <p className="mb-6 text-gray-600">
          Thank you for shopping with TechNova. Your order has been placed
          successfully.
        </p>

        {orderId && (
          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <p className="mb-2 text-sm text-gray-500">Order ID</p>
            <p className="break-all font-medium text-gray-900">{orderId}</p>
          </div>
        )}

        <Link
          href="/"
          className="inline-flex w-full items-center justify-center rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
