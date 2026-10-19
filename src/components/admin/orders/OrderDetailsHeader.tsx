import Link from "next/link";

interface Props {
  orderNumber: string;
  createdAt: string;
}

export default function OrderDetailsHeader({ orderNumber, createdAt }: Props) {
  return (
    <header className="space-y-3">
      <Link
        href="/admin/orders"
        className="text-sm text-gray-500 hover:text-gray-900"
      >
        ← Back to orders
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Order {orderNumber}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Placed on {new Date(createdAt).toLocaleString("en-IN")}
        </p>
      </div>
    </header>
  );
}
