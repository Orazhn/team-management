import db from "@/db/drizzle";
import { IAttendance } from "@/types/attendance";
import { attendances } from "@/db/schema/attendances";
import { eq } from "drizzle-orm";

class Attendance {
  postAttendance = async (attendance: IAttendance) => {
    await db.insert(attendances).values(attendance);
  };

  getAttendances = async () => {
    const data = await db.select().from(attendances);
    return data;
  };
  getEmployeeAttendance = async (id: string) => {
    const data = await db
      .select()
      .from(attendances)
      .where(eq(attendances.employeeId, id));
    return data;
  };
}

export const attendanceClass = new Attendance();
