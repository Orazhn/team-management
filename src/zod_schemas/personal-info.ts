import { z } from "zod";
import { marital_status } from "@/types/mainEnums";
import { gender } from "@/types/mainEnums";

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  mobileNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.string({
    required_error: "Date of birth is required",
  }),
  maritalStatus: z.enum(Object.keys(marital_status) as [string, ...string[]]),
  gender: z.enum(Object.keys(gender) as [string, ...string[]]),
  nationality: z.string().min(1, "Nationality is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
