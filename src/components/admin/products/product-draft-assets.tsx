"use client";

import { useEffect, useMemo, type KeyboardEvent } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image as ImageIcon, Layers, Trash2 } from "lucide-react";

import type { CreateVariantPayload } from "@/types/admin-product";
import { getProductVariantAttributes } from "@/utils/product-variant";
import {
  adminProductVariantSchema,
  type AdminProductVariantFormInput,
  type AdminProductVariantFormValues,
} from "@/validations/admin-product-variant.schema";

interface ProductDraftAssetsProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  variants: CreateVariantPayload[];
  onVariantsChange: (variants: CreateVariantPayload[]) => void;
}

const emptyVariant: AdminProductVariantFormInput = {
  sku: "",
  options: [],
  price: "",
  comparePrice: "",
  stock: 0,
};

const variantFields = [
  { name: "sku", label: "SKU", type: "text" },
  { name: "price", label: "Price (₹)", type: "number" },
  { name: "comparePrice", label: "Compare Price (₹)", type: "number" },
  { name: "stock", label: "Stock Quantity", type: "number" },
] as const;

export default function ProductDraftAssets({
  images,
  onImagesChange,
  variants,
  onVariantsChange,
}: ProductDraftAssetsProps) {
  const form = useForm<
    AdminProductVariantFormInput,
    unknown,
    AdminProductVariantFormValues
  >({
    resolver: zodResolver(adminProductVariantSchema),
    defaultValues: emptyVariant,
  });
  const optionFields = useFieldArray({
    control: form.control,
    name: "options",
  });

  const imagePreviews = useMemo(
    () => images.map((image) => URL.createObjectURL(image)),
    [images],
  );

  useEffect(
    () => () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    },
    [imagePreviews],
  );

  const addVariant = (values: AdminProductVariantFormValues) => {
    const attributes = Object.fromEntries(
      values.options
        .filter((option) => option.name && option.value)
        .map((option) => [option.name, option.value]),
    );

    onVariantsChange([
      ...variants,
      {
        sku: values.sku.trim(),
        attributes,
        price: values.price,
        comparePrice:
          values.comparePrice === "" || values.comparePrice === undefined
            ? undefined
            : Number(values.comparePrice),
        stock: values.stock,
      },
    ]);
    form.reset(emptyVariant);
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Product Images</h2>
          <p className="mt-0.5 text-xs font-medium text-slate-500">
            Add at least one image. The selected images will upload when you
            create the product.
          </p>
        </div>

        <label className="block cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-4 text-center transition hover:border-slate-400">
          <span className="text-xs font-bold text-slate-600">
            Choose image files
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => {
              const selected = Array.from(event.target.files ?? []);
              if (selected.length) onImagesChange([...images, ...selected]);
              event.currentTarget.value = "";
            }}
            className="hidden"
          />
        </label>

        {images.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((image, index) => (
              <div
                key={`${image.name}-${image.lastModified}-${index}`}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50">
                  {/* Local object URLs are created and revoked by this component. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreviews[index]}
                    alt={image.name}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
                <p className="mt-2 truncate text-xs font-semibold text-slate-600">
                  {image.name}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    onImagesChange(
                      images.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                  className="mt-2 inline-flex w-full items-center justify-center gap-1 rounded-xl border border-slate-200 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50"
                >
                  <Trash2 className="h-3 w-3" />
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="flex items-center justify-center rounded-2xl border border-dashed border-amber-200 bg-amber-50 p-4 text-xs font-semibold text-amber-800">
            <ImageIcon className="mr-2 h-4 w-4" />
            Add at least one product image to continue.
          </p>
        )}
      </section>

      <section className="space-y-5 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Product Variants</h2>
          <p className="mt-0.5 text-xs font-medium text-slate-500">
            Add at least one SKU with its pricing and inventory before creating
            the product.
          </p>
        </div>

        <div
          onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
            if (
              event.key === "Enter" &&
              event.target instanceof HTMLInputElement
            ) {
              event.preventDefault();
              void form.handleSubmit(addVariant)();
            }
          }}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {variantFields.map((field) => (
              <div key={field.name} className="space-y-1.5">
                <label
                  htmlFor={`draft-${field.name}`}
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
                  id={`draft-${field.name}`}
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
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xs font-bold text-slate-700">
                  Custom options
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Add only the attributes that apply, such as Size, Material, or
                  CPU.
                </p>
              </div>
              <button
                type="button"
                onClick={() => optionFields.append({ name: "", value: "" })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Add Option
              </button>
            </div>
            {optionFields.fields.map((field, index) => (
              <div
                key={field.id}
                className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
              >
                <div>
                  <label
                    htmlFor={`draft-option-name-${index}`}
                    className="mb-1.5 block text-xs font-bold text-slate-700"
                  >
                    Option name
                  </label>
                  <input
                    id={`draft-option-name-${index}`}
                    placeholder="e.g. RAM"
                    {...form.register(`options.${index}.name`)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  />
                  {form.formState.errors.options?.[index]?.name && (
                    <p className="mt-1 text-xs font-semibold text-rose-600">
                      {form.formState.errors.options[index]?.name?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`draft-option-value-${index}`}
                    className="mb-1.5 block text-xs font-bold text-slate-700"
                  >
                    Value
                  </label>
                  <input
                    id={`draft-option-value-${index}`}
                    placeholder="e.g. 8GB"
                    {...form.register(`options.${index}.value`)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  />
                  {form.formState.errors.options?.[index]?.value && (
                    <p className="mt-1 text-xs font-semibold text-rose-600">
                      {form.formState.errors.options[index]?.value?.message}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  aria-label={`Remove option ${index + 1}`}
                  onClick={() => optionFields.remove(index)}
                  className="self-end rounded-xl border border-slate-200 p-2.5 text-rose-600 hover:bg-rose-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => void form.handleSubmit(addVariant)()}
            className="rounded-2xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
          >
            Add Variant
          </button>
        </div>

        {variants.length > 0 ? (
          <div className="space-y-2">
            {variants.map((variant, index) => (
              <div
                key={`${variant.sku}-${index}`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-3"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    {variant.sku}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {Object.entries(getProductVariantAttributes(variant))
                      .map(([name, value]) => `${name}: ${value}`)
                      .join(" / ") || "No options"}{" "}
                    · ₹{variant.price.toLocaleString("en-IN")} · {variant.stock}{" "}
                    in stock
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onVariantsChange(
                      variants.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50"
                >
                  <Trash2 className="h-3 w-3" />
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="flex items-center justify-center rounded-2xl border border-dashed border-amber-200 bg-amber-50 p-4 text-xs font-semibold text-amber-800">
            <Layers className="mr-2 h-4 w-4" />
            Add at least one product variant to continue.
          </p>
        )}
      </section>
    </div>
  );
}
