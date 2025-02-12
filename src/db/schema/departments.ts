import { text, jsonb, serial, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: text().notNull().unique(),
  membersId: jsonb("members_id"),
  updated_at: timestamp().defaultNow(),
});
