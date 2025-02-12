import { text, integer, date } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { employees } from "./employees";

export const leaves = pgTable("leaves", {
  employeeId: text("employee_id").references(() => employees.employeeId, {
    onDelete: "cascade",
  }),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  days: integer().notNull(),
  reportingManager: text("reporting_manager").notNull(),
  leaveStatus: text("leave_status"),
});
