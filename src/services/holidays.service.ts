import db from "@/db/drizzle";
import { holidays } from "@/db/schema/holidays";
import { IHoliday } from "@/types/holiday";

class Holidays {
  postHoliday = async (holiday: IHoliday) => {
    await db.insert(holidays).values(holiday);
  };

  getHolidays = async () => {
    const data = await db.select().from(holidays);
    return data;
  };
}

export const holidaysClass = new Holidays();
