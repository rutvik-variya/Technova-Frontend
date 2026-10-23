import { z } from "zod";

export const adminProductVariantSchema = z.object({
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

export type AdminProductVariantFormInput = z.input<
  typeof adminProductVariantSchema
>;
export type AdminProductVariantFormValues = z.output<
  typeof adminProductVariantSchema
>;
