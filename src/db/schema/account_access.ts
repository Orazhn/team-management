import { text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { employees } from "./employees";

export const accountAccessInformation = pgTable("account_access_information", {
  employeeId: text("employee_id")
    .references(() => employees.employeeId, {
      onDelete: "cascade",
    })
    .notNull(),
  email: text(),
  slackID: text().unique(),
  skypeID: text().unique(),
  githubID: text().unique(),
});
