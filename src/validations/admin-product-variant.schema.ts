import { z } from "zod";

export const adminProductVariantSchema = z
  .object({
    sku: z.string().trim().min(1, "SKU is required"),
    options: z.array(
      z.object({
        name: z.string().trim(),
        value: z.string().trim(),
      }),
    ),
    price: z.coerce.number().positive("Price must be greater than zero"),
    comparePrice: z
      .union([
        z.literal(""),
        z.coerce.number().positive("Compare price must be greater than zero"),
      ])
      .optional(),
    stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  })
  .superRefine(({ options }, context) => {
    const names = new Set<string>();

    options.forEach(({ name, value }, index) => {
      if (!name && !value) return;

      if (!name) {
        context.addIssue({
          code: "custom",
          message: "Option name is required",
          path: ["options", index, "name"],
        });
      } else if (names.has(name.toLowerCase())) {
        context.addIssue({
          code: "custom",
          message: "Option names must be unique",
          path: ["options", index, "name"],
        });
      } else {
        names.add(name.toLowerCase());
      }

      if (!value) {
        context.addIssue({
          code: "custom",
          message: "Option value is required",
          path: ["options", index, "value"],
        });
      }
    });
  });

export type AdminProductVariantFormInput = z.input<
  typeof adminProductVariantSchema
>;
export type AdminProductVariantFormValues = z.output<
  typeof adminProductVariantSchema
>;
