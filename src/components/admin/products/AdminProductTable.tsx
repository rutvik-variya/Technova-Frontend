import Link from "next/link";

import ProductStatusBadge from "./ProductStatusBadge";

import type { AdminProduct } from "@/types/admin-product";

interface AdminProductTableProps {
  products: AdminProduct[];
  onDelete: (product: AdminProduct) => void;
  deletingProductId?: string | null;
}

const formatPrice = (price: string | number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(price));

export default function AdminProductTable({
  products,
  onDelete,
  deletingProductId,
}: AdminProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center">
        <h3 className="font-semibold text-gray-900">No products found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Try changing your filters or create a new product.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="min-w-212.5 w-full text-left text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-5 py-4 font-medium">Product</th>
            <th className="px-5 py-4 font-medium">Brand</th>
            <th className="px-5 py-4 font-medium">Category</th>
            <th className="px-5 py-4 font-medium">Price</th>
            <th className="px-5 py-4 font-medium">Status</th>
            <th className="px-5 py-4 text-right font-medium">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {products.map((product) => {
            const primaryImage =
              product.productImages?.find((image) => image.isPrimary) ??
              product.productImages?.[0];

            return (
              <tr
                key={product.id}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {primaryImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={primaryImage.url}
                        alt={product.name}
                        className="h-12 w-12 rounded-lg border border-gray-200 object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                        No image
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="max-w-xs truncate font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {product.productVariants?.length ?? 0} variants
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-gray-600">{product.brand}</td>

                <td className="px-5 py-4 text-gray-600">
                  {product.category?.name ?? "—"}
                </td>

                <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-900">
                  {formatPrice(product.basePrice)}
                  {Number(product.maxPrice) !== Number(product.basePrice) && (
                    <span className="ml-1 text-xs font-normal text-gray-500">
                      – {formatPrice(product.maxPrice)}
                    </span>
                  )}
                </td>

                <td className="px-5 py-4">
                  <ProductStatusBadge status={product.status} />
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      disabled={deletingProductId === product.id}
                      onClick={() => onDelete(product)}
                      className="font-medium text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingProductId === product.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
