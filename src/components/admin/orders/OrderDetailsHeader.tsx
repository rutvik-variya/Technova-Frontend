import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";

interface Props {
  orderNumber: string;
  createdAt: string;
}

export default function OrderDetailsHeader({ orderNumber, createdAt }: Props) {
  return (
    <header className="space-y-4 border-b border-slate-200/80 pb-6">
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to orders</span>
      </Link>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
              <ShoppingCart className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Order #{orderNumber}
            </h1>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Placed on {new Date(createdAt).toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </header>
  );
}