import { z } from "zod";
import parsePhoneNumber from "libphonenumber-js";

const phoneSchema = z
    .string()
    .min(1, "Phone number is required")
    .refine((value) => {
        try {
            const phoneNumber = parsePhoneNumber(value);
            return phoneNumber?.isValid();
        } catch {
            return false;
        }
    }, "Invalid phone number");

const branchSchema = z.object({
    businessName: z.string().min(1, "Business name is required"),
    bussinessCountryCode: z.string().min(1, "Country code is required"),
    bussinessPhone: phoneSchema,
    businessEmail: z.string().email("Invalid email address"),
    pin: z.string().min(1, "PIN is required"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    latitude: z.number({ invalid_type_error: "Latitude must be a number" }),
    longitude: z.number({ invalid_type_error: "Longitude must be a number" }),
    currency: z.string().min(1, "Currency is required"),
    businessType: z.string().min(1, "Business type is required"),
    menuLanguage: z.string().min(1, "Menu language is required"),
    mode: z.string().min(1, "Mode is required"),
    design: z.string().min(1, "Design is required"),
    servingWays: z.array(z.string()).min(1, "At least one serving way is required"),
    callWaiter: z.boolean(),
    paymentMethods: z.array(z.string()).min(1, "At least one payment method is required"),
    paymentTime: z.string().min(1, "Payment time is required"),

    numberOfTable: z
        .number({ invalid_type_error: "Number of tables must be a number" })
        .optional(),
}).superRefine((data, ctx) => {
    if (data.servingWays.includes("dinein") && (data.numberOfTable == null || isNaN(data.numberOfTable))) {
        ctx.addIssue({
            path: ["numberOfTable"],
            code: z.ZodIssueCode.custom,
            message: "Number of tables is required when serving way includes dinein",
        });
    }
});

export const branchesArraySchema = z.array(branchSchema).min(1, "At least one branch is required");

export const saveNewRegisterUserFormSchema = z
    .object({
        image: z
            .instanceof(File)
            .refine((file) => file.size > 0, "Image is required")
            .refine(
                (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
                "Only JPEG, PNG, or WebP images are allowed"
            ),

        fullName: z
            .string()
            .min(2, "Full name must be at least 2 characters")
            .max(100, "Full name must be less than 100 characters"),

        email: z.string().email("Invalid email address"),

        countryCode: z
            .string()
            .min(1, "Country code is required")
            .regex(/^\+\d+$/, "Country code must start with + and contain digits"),

        phone: phoneSchema,

        website: z
            .string()
            .url("Invalid website URL")
            .optional()
            .or(z.literal("")),

        month: z
            .string()
            .regex(/^(0?[1-9]|1[0-2])$/, "Invalid month"),

        day: z
            .string()
            .regex(/^(0?[1-9]|[12][0-9]|3[01])$/, "Invalid day"),

        year: z
            .string()
            .regex(/^\d{4}$/, "Invalid year")
            .refine((year) => {
                const y = Number(year);
                return y >= 1900 && y <= new Date().getFullYear();
            }, "Year must be between 1900 and current year"),

        country: z.string().min(1, "Country is required"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/\d/, "Password must contain at least one number")
            .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),

        confirmPassword: z.string().min(1, "Please confirm your password"),

        branches: branchesArraySchema
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });