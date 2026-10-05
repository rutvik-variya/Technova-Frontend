import type { OrderAddress } from "@/types/order";
import { MapPin, Phone, User } from "lucide-react";

interface OrderAddressProps {
  address: OrderAddress;
}

export default function OrderAddress({ address }: OrderAddressProps) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <MapPin className="h-4 w-4" />
        </div>
        <h2 className="text-base font-bold text-slate-900">Delivery Address</h2>
      </div>

      <div className="mt-4 space-y-2 text-xs leading-relaxed text-slate-600">
        <p className="flex items-center gap-1.5 font-bold text-sm text-slate-900">
          <User className="h-3.5 w-3.5 text-slate-400" />
          {address.fullName}
        </p>

        <p className="text-slate-700 pl-5">{address.addressLine1}</p>

        {address.addressLine2 && (
          <p className="text-slate-700 pl-5">{address.addressLine2}</p>
        )}

        {address.landmark && (
          <p className="text-slate-500 italic pl-5">Near: {address.landmark}</p>
        )}

        <p className="text-slate-700 pl-5 font-medium">
          {address.city}, {address.state} - {address.postalCode}
        </p>

        <p className="text-slate-700 pl-5">{address.country}</p>

        <div className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-3 font-medium text-slate-800">
          <Phone className="h-3.5 w-3.5 text-slate-400" />
          <span>{address.phone}</span>
        </div>
      </div>
    </section>
  );
}
