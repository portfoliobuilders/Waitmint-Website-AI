import { z } from "zod";

export const emailSchema = z.string().trim().email("Enter a valid email");

export const passwordSchema = z
  .string()
  .min(8, "Use at least 8 characters")
  .max(72, "Password is too long");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const magicLinkSchema = z.object({
  email: emailSchema,
});

export const redeemSchema = z.object({
  method: z.enum(["amazon_voucher", "upi"]),
  detail: z.string().trim().min(3, "Enter payout details").max(200),
});

export const companySchema = z.object({
  companyName: z.string().trim().min(2, "Enter a company name").max(80),
});

export const campaignDraftSchema = z.object({
  destinationUrl: z.string().trim().url("Enter a valid https URL"),
  brand: z.string().trim().min(1).max(80),
  headline: z.string().trim().min(1).max(80),
  body: z.string().trim().max(200).optional().or(z.literal("")),
  cta: z.string().trim().min(1).max(32),
  surfaces: z.array(z.string()).min(1, "Choose at least one surface"),
  cpmInr: z.number().int().min(10, "Minimum CPM is ₹10"),
  budgetInr: z.number().int().min(10, "Minimum budget is ₹10"),
});
