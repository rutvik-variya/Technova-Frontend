"use client";

import Link from "next/link";

import { useAdminProducts } from "@/hooks/admin/products/use-admin-products";

export default function AdminProductsPage() {
  const { data, isPending, isError, error, refetch } = useAdminProducts();

  const products = data?.data?.products ?? [];

  return (
    <main className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your TechNova product catalog.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="rounded-lg bg-gray-900 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700"
        >
          + Add Product
        </Link>
      </div>

      {isPending && (
        <div className="rounded-xl border border-gray-200 p-6">
          <p className="animate-pulse text-sm text-gray-500">
            Loading products...
          </p>
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="font-medium text-red-700">Failed to load products</p>

          <p className="mt-1 text-sm text-red-600">
            {error instanceof Error ? error.message : "Something went wrong."}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 rounded-lg border border-red-300 px-4 py-2 text-sm text-red-700 hover:bg-red-100"
          >
            Try again
          </button>
        </div>
      )}

      {!isPending && !isError && products.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
          <h2 className="font-semibold text-gray-900">No products found</h2>
          <p className="mt-2 text-sm text-gray-500">
            Create your first product to get started.
          </p>
        </div>
      )}

      {!isPending && !isError && products.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="min-w-187.5 w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Brand</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {products.map((product) => {
                console.log("product::::::>", product);
                const image =
                  product.productImages?.find((item) => item.isPrimary) ??
                  product.productImages?.[0];

                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={image.url}
                            alt={product.name}
                            className="h-12 w-12 rounded-lg border object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                            No image
                          </div>
                        )}

                        <div>
                          <p className="font-medium text-gray-900">
                            {product.name}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {product.productVariants?.length ?? 0} variants
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">{product.brand}</td>

                    <td className="px-5 py-4">
                      {product.category?.name ?? "—"}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      ₹{Number(product.basePrice).toLocaleString("en-IN")}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          product.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="font-medium text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
