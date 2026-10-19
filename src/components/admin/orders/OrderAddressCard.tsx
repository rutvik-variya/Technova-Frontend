import type { AdminOrderAddress } from "@/types/admin-order.types";

interface Props {
  address: AdminOrderAddress;
}

export default function OrderAddressCard({ address }: Props) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="font-semibold text-gray-900">Shipping address</h2>

      <div className="mt-4 space-y-1 text-sm text-gray-600">
        <p className="font-medium text-gray-900">{address.fullName}</p>
        <p>{address.phone}</p>
        <p>{address.addressLine1}</p>

        {address.addressLine2 && <p>{address.addressLine2}</p>}
        {address.landmark && <p>Landmark: {address.landmark}</p>}

        <p>
          {address.city}, {address.state} {address.postalCode}
        </p>
        <p>{address.country}</p>
      </div>
    </section>
  );
}
