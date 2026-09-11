import { z } from "zod";

export const reviewSchema = z.object({
    rating: z
        .number()
        .min(1, "Please select a rating")
        .max(5, "Rating must be between 1 and 5"),

    comment: z
        .string()
        .trim()
        .min(3, "Comment must be at least 3 characters")
        .max(1000, "Comment must not exceed 1000 characters"),
});

export type ReviewFormValues = z.infer<
    typeof reviewSchema
>;