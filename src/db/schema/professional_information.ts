import { text, date, jsonb } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { employees } from "./employees";

export const professionalInformation = pgTable("professional_information", {
  employeeId: text("employee_id")
    .references(() => employees.employeeId, {
      onDelete: "cascade",
    })
    .notNull(),
  userName: text("user_name").notNull(),
  employeeType: text("employee_type").notNull(),
  email: text().unique().notNull(),
  departmentName: text("department_name"),
  designation: text().notNull(),
  workingDays: jsonb("working_days").notNull(),
  joiningDate: date("joining_date").notNull(),
  officeLocation: text("office_location").notNull(),
});
