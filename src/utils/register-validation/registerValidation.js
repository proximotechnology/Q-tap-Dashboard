import { z } from "zod";


const timeString = z.string().regex(/^([1-9]|1[0-2]):[0-5][0-9] (am|pm)$/, {
    message: "Invalid time format, expected e.g. '9:00 am'",
});

const workSchedulesSchema = z.record(
    z.tuple([timeString, timeString])
);



const branchSchema = z.object({
    businessEmail: z.string().email("Invalid email"),
    businessName: z.string().min(1, "Business name is required"),
    businessPhone: z.string().min(1, "Phone is required"),
    callWaiter: z.enum(["active", "inactive"]),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    currency: z.string().min(1, "Currency is required"),
    design: z.enum(["grid", "list", "classic"]), // add allowed designs
    format: z.string(), // optionally restrict values
    latitude: z.string({ required_error: "Latitude is required" }),
    longitude: z.string({ required_error: "longtude is required" }),
    mode: z.enum(["white", "dark"]),
    paymentMethods: z.array(z.string()).min(1, "At least one payment method is required"),
    paymentTime: z.enum(["before", "after"]),
    pin: z.string().regex(/^\d*$/, "Must be a number").length(6, "pin required and must be 6 digits"),
    servingWays: z.array(z.string()).min(1, "At least one serving Ways is required"),
    tableCount: z.coerce.number().optional(),
    website: z.string(), // OR use z.string().url() for stricter validation
    workschedules: workSchedulesSchema,
});


const schema = z.object({
    branches: z.array(branchSchema),
});

export default schema;


export const getValidationError = (branches) => {
    const result = schema.safeParse({ branches });
    if (result.success) {
        console.log("✅ Validation passed:", result.data);
        return null;
    } else {
        const formatted = result.error.format();
        console.error("❌ Validation failed:", formatted);
        let branchError = []

        for (const key in formatted) {
            if (key === "_errors") continue;

            const section = formatted[key];

            // Handle business (object)
            if (key === "business") {
                for (const field in section) {
                    if (field === "_errors") continue;
                    const fieldErrors = section[field]?._errors;
                    if (fieldErrors?.length) {
                        console.log(`business.${field}: ${fieldErrors.join(", ")}`);
                    }
                }
            }


            // Handle branches (array)
            if (key === "branches") {


                Object.entries(section).forEach(([fieldKey, value]) => {
                    if (fieldKey !== "_errors") {
                        Object.entries(value).forEach(([key, value]) => {
                            if (key !== "_errors") {
                                branchError.push(`branch ${(Number(fieldKey) + 1)} ` + value?._errors?.[0])
                                console.log(`branch ${(Number(fieldKey) + 1)}`, key, value?._errors?.[0])
                            }
                        })
                    }


                })

            }
        }

        return { branchError }
    }
}