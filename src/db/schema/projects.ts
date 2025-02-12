import { text, serial, date, jsonb } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("sr_no"),
  projectName: text("project_name").notNull(),
  startDate: date("start_date").notNull(),
  finishDate: date("finish_date").notNull(),
  processStatus: text("process_status").$default(() => "In Process"),
  employersId: jsonb("employers_id"),
});
