
import { z } from "zod";

const today = () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export const adminCouponSchema = z
    .object({
        code: z
            .string()
            .trim()
            .min(3, "Coupon code must be at least 3 characters")
            .max(30, "Coupon code cannot exceed 30 characters")
            .transform((value) => value.toUpperCase()),

        description: z
            .string()
            .trim()
            .max(200, "Description cannot exceed 200 characters"),

        type: z.enum(["PERCENTAGE", "FIXED"], {
            error: "Please select a coupon type",
        }),

        value: z.coerce
            .number()
            .positive("Discount value must be greater than zero"),

        minOrderAmount: z.coerce
            .number()
            .positive("Minimum order amount must be greater than zero"),

        maxOrderAmount: z.union([
            z.literal(""),
            z.coerce.number().positive(
                "Maximum order amount must be greater than zero",
            ),
        ]),

        usageLimit: z.union([
            z.literal(""),
            z.coerce.number().int().positive(
                "Usage limit must be a positive whole number",
            ),
        ]),

        startDate: z.string().min(1, "Start date is required"),
        endDate: z.string().min(1, "End date is required"),

        status: z.enum(["ACTIVE", "INACTIVE"]),
    })
    .superRefine((data, ctx) => {
        const currentDate = today();

        // Start date cannot be in the past.
        if (data.startDate && data.startDate < currentDate) {
            ctx.addIssue({
                code: "custom",
                path: ["startDate"],
                message: "Start date cannot be in the past",
            });
        }

        // End date cannot be in the past.
        if (data.endDate && data.endDate < currentDate) {
            ctx.addIssue({
                code: "custom",
                path: ["endDate"],
                message: "End date cannot be in the past",
            });
        }

        // End date must be after start date.
        if (
            data.startDate &&
            data.endDate &&
            data.endDate <= data.startDate
        ) {
            ctx.addIssue({
                code: "custom",
                path: ["endDate"],
                message: "End date must be after start date",
            });
        }

        // Percentage discount cannot exceed 100%.
        if (data.type === "PERCENTAGE" && data.value > 100) {
            ctx.addIssue({
                code: "custom",
                path: ["value"],
                message: "Percentage discount cannot exceed 100",
            });
        }

        // Percentage coupons require a maximum discount.
        if (
            data.type === "PERCENTAGE" &&
            data.maxOrderAmount === ""
        ) {
            ctx.addIssue({
                code: "custom",
                path: ["maxOrderAmount"],
                message:
                    "A maximum discount value is required for percentage coupons",
            });
        }

        // Fixed amount coupons require maximum order amount
        // to be greater than minimum order amount.
        if (
            data.type === "FIXED" &&
            data.maxOrderAmount !== "" &&
            typeof data.maxOrderAmount === "number" &&
            data.maxOrderAmount <= data.minOrderAmount
        ) {
            ctx.addIssue({
                code: "custom",
                path: ["maxOrderAmount"],
                message:
                    "Maximum order amount must be greater than minimum order amount",
            });
        }
    });

export type AdminCouponFormValues = z.input<
    typeof adminCouponSchema
>;

export type AdminCouponValidatedValues = z.output<
    typeof adminCouponSchema
>;
