"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layers, Pencil, Trash2, Loader2 } from "lucide-react";

import type {
  ProductVariant,
  CreateVariantPayload,
} from "@/types/admin-product";

import { useCreateProductVariant } from "@/hooks/admin/products/use-create-product-variant";
import { useUpdateProductVariant } from "@/hooks/admin/products/use-update-product-variant";
import { useDeleteProductVariant } from "@/hooks/admin/products/use-delete-product-variant";

const variantSchema = z.object({
  sku: z.string().trim().min(1, "SKU is required"),
  ram: z.string().optional(),
  storage: z.string().optional(),
  color: z.string().optional(),
  price: z.coerce.number().positive("Price must be greater than zero"),
  comparePrice: z
    .union([
      z.literal(""),
      z.coerce.number().positive("Compare price must be greater than zero"),
    ])
    .optional(),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
});

type VariantFormInput = z.input<typeof variantSchema>;
type VariantFormValues = z.output<typeof variantSchema>;

interface ProductVariantManagerProps {
  productId: string;
  productSlug: string;
  variants: ProductVariant[];
}

const emptyValues: VariantFormValues = {
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

  const createMutation = useCreateProductVariant();
  const updateMutation = useUpdateProductVariant();
  const deleteMutation = useDeleteProductVariant();

  const form = useForm<VariantFormInput, unknown, VariantFormValues>({
    resolver: zodResolver(variantSchema),
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

  const onSubmit = (values: VariantFormValues) => {
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
        { productId, variantId: editingVariantId, payload },
        { onSuccess: resetForm },
      );
    } else {
      createMutation.mutate({ productId, payload }, { onSuccess: resetForm });
    }
  };

  const handleDelete = (variant: ProductVariant) => {
    if (!window.confirm(`Delete variant ${variant.sku}?`)) return;
    deleteMutation.mutate({ productId, productSlug, variantId: variant.id });
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
              {variants.map((variant) => (
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

              {variants.length === 0 && (
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
    </section>
  );
}
