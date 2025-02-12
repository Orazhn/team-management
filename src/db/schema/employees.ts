import { integer, text, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { departments } from "./departments";

export const employees = pgTable("employees", {
  employeeId: text("employee_id").primaryKey().notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text().notNull().unique(),
  employeeName: text("employee_name").notNull(),
  designation: text().notNull(),
  employeeType: text("employee_type").notNull(),
  status: text("status")
    .$default(() => "Permanent")
    .notNull(),
  departmentId: integer("department_id")
    .references(() => departments.id)
    .notNull(),
  departmentName: text("department_name").notNull(),
  updated_at: timestamp().defaultNow(),
});
