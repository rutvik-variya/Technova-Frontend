import { Truck } from "lucide-react";

export default function AdminShippingEmpty() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 text-center sm:p-12 shadow-xs">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
        <Truck className="h-7 w-7" />
      </div>

      <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
        No Shipping Methods Found
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-500">
        Your configured shipping options and delivery configurations will appear here.
      </p>
    </div>
  );
}