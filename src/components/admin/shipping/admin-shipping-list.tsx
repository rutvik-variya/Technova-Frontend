import AdminShippingCard from "@/components/admin/shipping/admin-shipping-card";
import type { AdminShippingMethod } from "@/types/admin-shipping";

interface AdminShippingListProps {
  methods: AdminShippingMethod[];
}

export default function AdminShippingList({ methods }: AdminShippingListProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {methods.map((method) => (
        <AdminShippingCard key={method.id} method={method} />
      ))}
    </div>
  );
}
