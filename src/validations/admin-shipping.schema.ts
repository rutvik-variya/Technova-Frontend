import { z } from "zod";

export const adminShippingSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name cannot exceed 100 characters"),

    baseCharge: z
        .number({ error: "Base charge is required" })
        .min(0, "Base charge cannot be negative")
        .max(1_000_000, "Base charge cannot exceed 1,000,000"),

    freeShippingAbove: z
        .number({ error: "Free shipping threshold is required" })
        .min(0, "Threshold cannot be negative")
        .max(10_000_000, "Threshold cannot exceed 10,000,000"),

    estimatedDays: z
        .number({ error: "Estimated delivery days are required" })
        .int("Estimated days must be a whole number")
        .min(1, "Estimated days must be at least 1")
        .max(365, "Estimated days cannot exceed 365"),

    isActive: z.boolean(),
});

export type AdminShippingFormValues = z.infer<
    typeof adminShippingSchema
>;