import { z } from "zod";

export const professionalInfoSchema = z.object({
  employeeId: z
    .string()
    .length(9, "Employee ID must be exactly 9 digits")
    .regex(/^\d{9}$/, "Employee ID must contain only digits"),
  userName: z.string().min(2, "User name must be at least 2 characters"),
  employeeType: z.string().min(1, "Select Employee Type"),
  email: z.string().email("Invalid email address"),
  departmentName: z.string().min(1, "Select Department"),
  departmentId: z.string(),
  designation: z.string().min(2, "Designation must be at least 2 characters"),
  workingDays: z
    .array(
      z.enum([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
        "",
      ])
    )
    .min(1, {
      message: "You have to select at least one day.",
    }),
  joiningDate: z.string({
    required_error: "Date is required",
  }),
  officeLocation: z.string().min(5, "Choose Office Location"),
});

export type ProfessionalInfoFormData = z.infer<typeof professionalInfoSchema>;
