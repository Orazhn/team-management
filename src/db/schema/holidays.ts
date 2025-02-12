import { serial, date, text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const holidays = pgTable("holidays", {
  id: serial("id").notNull(),
  date: date().notNull(),
  day: text("day").notNull(),
  holidayName: text("holiday_name").notNull(),
});
