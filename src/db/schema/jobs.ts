import { text, serial, jsonb, integer, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  id: serial().primaryKey(),
  title: text().notNull(),
  description: text().notNull(),
  salary: integer("salary").notNull(),
  location: text().notNull(),
  jobType: text("job_type"),
  categories: jsonb(),
  updated_at: timestamp().defaultNow(),
});
