import type { ProductStatus } from "@/types/admin-product";

interface ProductStatusBadgeProps {
  status: ProductStatus;
}

export default function ProductStatusBadge({
  status,
}: ProductStatusBadgeProps) {
  const styles: Record<ProductStatus, string> = {
    ACTIVE: "bg-green-100 text-green-700",
    DRAFT: "bg-gray-100 text-gray-700",
    ARCHIVED: "bg-amber-100 text-amber-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status === "ACTIVE"
        ? "Active"
        : status === "DRAFT"
          ? "Draft"
          : "Archived"}
    </span>
  );
}
