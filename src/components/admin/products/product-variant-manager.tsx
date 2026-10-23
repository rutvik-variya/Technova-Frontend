"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Layers,
  Pencil,
  Trash2,
  Loader2,
  X,
} from "lucide-react";

import type {
  ProductVariant,
  CreateVariantPayload,
} from "@/types/admin-product";

import { useCreateProductVariant } from "@/hooks/admin/products/use-create-product-variant";
import { useUpdateProductVariant } from "@/hooks/admin/products/use-update-product-variant";
import { useDeleteProductVariant } from "@/hooks/admin/products/use-delete-product-variant";
import {
  adminProductVariantSchema,
  type AdminProductVariantFormInput,
  type AdminProductVariantFormValues,
} from "@/validations/admin-product-variant.schema";

interface ProductVariantManagerProps {
  productId: string;
  productSlug: string;
  variants: ProductVariant[];
}

const emptyValues: AdminProductVariantFormValues = {
  sku: "",
  ram: "",
  storage: "",
  color: "",
  price: 0,
  comparePrice: "",
  stock: 0,
};

export default function ProductVariantManager({
  productId,
  productSlug,
  variants,
}: ProductVariantManagerProps) {
  const [editingVariantId, setEditingVariantId] = useState<string | null>(null);
  const [variantToDelete, setVariantToDelete] = useState<ProductVariant | null>(
    null,
  );
  const activeVariants = variants.filter(
    (variant) => variant.isActive && !variant.deletedAt,
  );

  const createMutation = useCreateProductVariant();
  const updateMutation = useUpdateProductVariant();
  const deleteMutation = useDeleteProductVariant();

  const form = useForm<
    AdminProductVariantFormInput,
    unknown,
    AdminProductVariantFormValues
  >({
    resolver: zodResolver(adminProductVariantSchema),
    defaultValues: emptyValues,
  });

  const isSaving = createMutation.isPending || updateMutation.isPending;

  const resetForm = () => {
    setEditingVariantId(null);
    form.reset(emptyValues);
  };

  const startEditing = (variant: ProductVariant) => {
    setEditingVariantId(variant.id);
    form.reset({
      sku: variant.sku,
      ram: variant.ram ?? "",
      storage: variant.storage ?? "",
      color: variant.color ?? "",
      price: Number(variant.price),
      comparePrice: "",
      stock: variant.stock,
    });
  };

  const onSubmit = (values: AdminProductVariantFormValues) => {
    const payload: CreateVariantPayload = {
      sku: values.sku.trim(),
      ram: values.ram?.trim() || undefined,
      storage: values.storage?.trim() || undefined,
      color: values.color?.trim() || undefined,
      price: values.price,
      comparePrice:
        values.comparePrice === "" || values.comparePrice === undefined
          ? undefined
          : Number(values.comparePrice),
      stock: values.stock,
    };

    if (editingVariantId) {
      updateMutation.mutate(
        {
          productId,
          productQueryKey: productSlug,
          variantId: editingVariantId,
          payload,
        },
        { onSuccess: resetForm },
      );
    } else {
      createMutation.mutate(
        { productId, productQueryKey: productSlug, payload },
        { onSuccess: resetForm },
      );
    }
  };

  const handleDelete = (variant: ProductVariant) => {
    setVariantToDelete(variant);
  };

  const confirmDelete = () => {
    if (!variantToDelete) return;
    deleteMutation.mutate(
      { productId, productSlug, variantId: variantToDelete.id },
      { onSuccess: () => setVariantToDelete(null) },
    );
  };

  const fields = [
    { name: "sku", label: "SKU", type: "text" },
    { name: "ram", label: "RAM", type: "text" },
    { name: "storage", label: "Storage", type: "text" },
    { name: "color", label: "Color", type: "text" },
    { name: "price", label: "Price (₹)", type: "number" },
    { name: "comparePrice", label: "Compare Price (₹)", type: "number" },
    { name: "stock", label: "Stock Quantity", type: "number" },
  ] as const;

  return (
    <section className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Product Variants</h2>
        <p className="mt-0.5 text-xs font-medium text-slate-500">
          Configure SKUs, specs, pricing, and stock inventory
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map((field) => (
            <div key={field.name} className="space-y-1.5">
              <label
                htmlFor={field.name}
                className="block text-xs font-bold text-slate-700"
              >
                {field.label}
                {(field.name === "sku" ||
                  field.name === "price" ||
                  field.name === "stock") && (
                  <span className="ml-1 text-rose-500">*</span>
                )}
              </label>

              <input
                id={field.name}
                type={field.type}
                step={field.name === "stock" ? "1" : "any"}
                min={field.name === "stock" ? "0" : undefined}
                {...form.register(field.name)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
              />

              {form.formState.errors[field.name] && (
                <p className="text-xs font-semibold text-rose-600">
                  {form.formState.errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-slate-800 disabled:opacity-50 active:scale-[0.98]"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : editingVariantId ? (
              "Update Variant"
            ) : (
              "Add Variant"
            )}
          </button>

          {editingVariantId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 active:scale-[0.98]"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-162.5 text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                <th className="px-5 py-3.5">SKU</th>
                <th className="px-5 py-3.5">Options</th>
                <th className="px-5 py-3.5">Price</th>
                <th className="px-5 py-3.5">Stock</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
              {activeVariants.map((variant) => (
                <tr
                  key={variant.id}
                  className="transition-colors hover:bg-slate-50/80"
                >
                  <td className="px-5 py-3.5 font-bold text-slate-900">
                    <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px]">
                      {variant.sku}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-slate-600">
                    {[variant.ram, variant.storage, variant.color]
                      .filter(Boolean)
                      .join(" / ") || "—"}
                  </td>

                  <td className="px-5 py-3.5 font-extrabold text-slate-900">
                    ₹{Number(variant.price).toLocaleString("en-IN")}
                  </td>

                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold ${
                        variant.stock > 0
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-rose-200 bg-rose-50 text-rose-700"
                      }`}
                    >
                      {variant.stock} in stock
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => startEditing(variant)}
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 transition hover:border-blue-600/30 hover:bg-blue-50 hover:text-blue-600 active:scale-[0.98]"
                      >
                        <Pencil className="h-3 w-3" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(variant)}
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 active:scale-[0.98]"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {activeVariants.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-8 text-center text-xs font-medium text-slate-400"
                  >
                    <Layers className="mx-auto mb-1 h-5 w-5 stroke-1" />
                    No variants created yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {variantToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-variant-title"
        >
          <button
            type="button"
            aria-label="Close delete variant dialog"
            disabled={deleteMutation.isPending}
            onClick={() => setVariantToDelete(null)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200 disabled:cursor-not-allowed"
          />

          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setVariantToDelete(null)}
              disabled={deleteMutation.isPending}
              className="absolute right-4 top-4 rounded-xl p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-600 shadow-xs">
                <AlertTriangle className="h-7 w-7" />
              </div>

              <h3
                id="delete-variant-title"
                className="text-lg font-bold text-slate-900"
              >
                Delete Product Variant
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Are you sure you want to permanently delete variant{" "}
                <strong className="text-slate-900">
                  {variantToDelete.sku}
                </strong>
                ?
              </p>

              <div className="mt-6 flex w-full flex-col-reverse gap-2.5 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => setVariantToDelete(null)}
                  disabled={deleteMutation.isPending}
                  className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-4 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50 sm:w-1/2"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deleteMutation.isPending}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-rose-600 px-4 text-xs font-bold text-white shadow-md shadow-rose-600/20 transition hover:bg-rose-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-1/2"
                >
                  {deleteMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Confirm Delete</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
