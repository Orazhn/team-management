import { text, serial, date, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const candidates = pgTable("candidates", {
  id: serial("id"),
  candidateName: text("candidate_name").notNull(),
  appliedFor: text("applied_for").notNull(),
  appliedDate: date("applied_date").notNull(),
  email: text().notNull(),
  mobileNumber: text("mobile_number").notNull(),
  candidateStatus: text("candidate_status").notNull(),
  updated_at: timestamp().defaultNow(),
});
