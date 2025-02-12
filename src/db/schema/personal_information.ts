import { date, text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { employees } from "./employees";

export const personalInformation = pgTable("personal_information", {
  employeeId: text("employee_id")
    .unique()
    .references(() => employees.employeeId, { onDelete: "cascade" })
    .notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text(),
  dateOfBirth: date("date_of_birth").notNull(),
  maritalStatus: text("marital_status").notNull(),
  mobileNumber: text("mobile_number").notNull(),
  gender: text("gender"),
  nationality: text().notNull(),
  address: text().notNull(),
  city: text().notNull(),
  state: text().notNull(),
  zipCode: text("zip_code").notNull(),
});
