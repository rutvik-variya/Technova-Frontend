import { z } from "zod";

export const addressSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, "Full name is required")
        .max(
            50,
            "Full name must be less than 50 characters"
        ),

    phone: z
        .string()
        .trim()
        .regex(
            /^[6-9]\d{9}$/,
            "Invalid phone number"
        ),

    country: z
        .string()
        .trim()
        .min(2, "Country is required")
        .max(
            100,
            "Country must be less than 100 characters"
        ),

    state: z
        .string()
        .trim()
        .min(2, "State is required"),

    city: z
        .string()
        .trim()
        .min(2, "City is required")
        .max(
            100,
            "City must be less than 100 characters"
        ),

    postalCode: z
        .string()
        .trim()
        .regex(
            /^\d{6}$/,
            "Invalid postal code"
        ),

    addressLine1: z
        .string()
        .trim()
        .min(5, "Address is required")
        .max(255),

    addressLine2: z
        .string()
        .trim()
        .max(255)
        .optional(),

    landmark: z
        .string()
        .trim()
        .max(255)
        .optional(),

    addressType: z
        .enum(["HOME", "WORK", "OTHER"])
        .optional(),

    isDefault: z.boolean().optional(),
});

export type AddressFormValues =
    z.infer<typeof addressSchema>;