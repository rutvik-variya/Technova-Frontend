import type { AdminOrderAddress } from "@/types/admin-order.types";
import { MapPin } from "lucide-react";

interface Props {
  address: AdminOrderAddress;
}

export default function OrderAddressCard({ address }: Props) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
        <MapPin className="h-4 w-4 text-slate-400" />
        <h2 className="text-sm font-bold text-slate-900">Shipping Address</h2>
      </div>

      <div className="mt-4 space-y-1 text-xs font-medium text-slate-600">
        <p className="text-sm font-bold text-slate-900">{address.fullName}</p>
        <p className="text-slate-500">{address.phone}</p>
        <p className="pt-2">{address.addressLine1}</p>

        {address.addressLine2 && <p>{address.addressLine2}</p>}
        {address.landmark && <p>Landmark: {address.landmark}</p>}

        <p>
          {address.city}, {address.state} {address.postalCode}
        </p>
        <p className="font-semibold text-slate-700">{address.country}</p>
      </div>
    </section>
  );
}
