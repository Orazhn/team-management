import { text, time, date, serial } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { employees } from "./employees";

export const attendances = pgTable("attendances", {
  id: serial(),
  employeeId: text("employee_id").references(() => employees.employeeId, {
    onDelete: "cascade",
  }),
  employeeName: text("employee_name").notNull(),
  designation: text(),
  employeeType: text("employee_type"),
  checkIn: time().notNull(),
  checkOut: time().notNull(),
  break: time().notNull(),
  workingHours: text("working_hours").notNull(),
  attendanceStatus: text("attendance_status").notNull(),
  date: date().notNull(),
});
