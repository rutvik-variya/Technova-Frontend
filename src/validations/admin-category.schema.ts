
import { z } from "zod";

export const adminCategorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Category name is required.")
        .max(100, "Category name must be 100 characters or fewer."),

    description: z
        .string()
        .trim()
        .max(500, "Description must be 500 characters or fewer.")
        .optional()
        .or(z.literal("")),

    image: z
        .url("Enter a valid image URL.")
});

export type AdminCategoryFormValues = z.infer<
    typeof adminCategorySchema
>;
