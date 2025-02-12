import { text, integer } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { employees } from "./employees";

export const payrolls = pgTable("payrolls", {
  employeeId: text("employee_id").references(() => employees.employeeId, {
    onDelete: "cascade",
  }),
  employeeName: text("employee_name").notNull(),
  ctc: integer(),
  salary: integer(),
  deduction: integer(),
  payrollStatus: text("payroll_status").$default(() => "Pending"),
});
