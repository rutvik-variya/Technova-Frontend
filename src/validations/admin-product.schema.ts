import { z } from "zod";

export const adminProductSchema = z.object({
    name: z.string().trim().min(1, "Product name is required"),
    description: z.string().trim().min(1, "Description is required"),
    shortDescription: z
        .string()
        .trim()
        .min(1, "Short description is required"),
    brand: z.string().trim().min(1, "Brand is required"),
    categoryId: z.string().min(1, "Please select a category"),
    status: z.enum(["ACTIVE", "DRAFT"]),
});

export type AdminProductFormValues = z.infer<
    typeof adminProductSchema
>;