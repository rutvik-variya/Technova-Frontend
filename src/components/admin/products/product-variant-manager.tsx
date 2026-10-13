"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  productSlug: string; // <--- Add
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
        {
          productId,
          variantId: editingVariantId,
          payload,
        },
        { onSuccess: resetForm },
      );
    } else {
      createMutation.mutate({ productId, payload }, { onSuccess: resetForm });
    }
  };

  const handleDelete = (variant: ProductVariant) => {
    // console.log("🗑️ variant.id:", variant.id);
    // console.log("🗑️ variant.productId:", variant.productId);
    // console.log("🗑️ productId prop:", productId);

    if (!window.confirm(`Delete variant ${variant.sku}?`)) return;

    deleteMutation.mutate({
      productId,
      productSlug,
      variantId: variant.id,
    });
  };

  const fields = [
    { name: "sku", label: "SKU", type: "text" },
    { name: "ram", label: "RAM", type: "text" },
    { name: "storage", label: "Storage", type: "text" },
    { name: "color", label: "Color", type: "text" },
    { name: "price", label: "Price", type: "number" },
    { name: "comparePrice", label: "Compare Price", type: "number" },
    { name: "stock", label: "Stock", type: "number" },
  ] as const;

  return (
    <section className="space-y-5 rounded-xl border border-gray-200 bg-white p-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Product Variants
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage SKU, options, price, and inventory for this product.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                {field.label}
                {field.name === "sku" ||
                field.name === "price" ||
                field.name === "stock"
                  ? " *"
                  : ""}
              </label>

              <input
                id={field.name}
                type={field.type}
                step={field.name === "stock" ? "1" : "any"}
                min={field.name === "stock" ? "0" : undefined}
                {...form.register(field.name)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
              />

              {form.formState.errors[field.name] && (
                <p className="mt-1 text-xs text-red-600">
                  {form.formState.errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {isSaving
              ? "Saving..."
              : editingVariantId
                ? "Update Variant"
                : "Add Variant"}
          </button>

          {editingVariantId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
            >
              Cancel Edit
            </button>
          )}
        </div>

        {(createMutation.isError || updateMutation.isError) && (
          <p className="text-sm text-red-600">
            {createMutation.error?.message ||
              updateMutation.error?.message ||
              "Failed to save the variant."}
          </p>
        )}
      </form>

      <div className="overflow-x-auto">
        <table className="w-full min-w-162.5 text-left text-sm">
          <thead className="border-b border-gray-200 text-gray-500">
            <tr>
              <th className="px-3 py-3">SKU</th>
              <th className="px-3 py-3">Options</th>
              <th className="px-3 py-3">Price</th>
              <th className="px-3 py-3">Stock</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {variants.map((variant) => (
              <tr key={variant.id}>
                <td className="px-3 py-3 font-medium text-gray-900">
                  {variant.sku}
                </td>
                <td className="px-3 py-3 text-gray-600">
                  {[variant.ram, variant.storage, variant.color]
                    .filter(Boolean)
                    .join(" / ") || "—"}
                </td>
                <td className="px-3 py-3">
                  {Number(variant.price).toLocaleString()}
                </td>
                <td className="px-3 py-3">{variant.stock}</td>
                <td className="px-3 py-3">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => startEditing(variant)}
                      className="font-medium text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        console.log("Full variant object:", variant);
                        handleDelete(variant);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {variants.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-gray-500">
                  No variants added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteMutation.isError && (
        <p className="text-sm text-red-600">
          {deleteMutation.error.message || "Failed to delete the variant."}
        </p>
      )}
    </section>
  );
}
