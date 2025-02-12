import db from "@/db/drizzle";
import { departments } from "@/db/schema/departments";
import { department } from "@/types/departments";
import { eq, inArray } from "drizzle-orm";
import { employees } from "@/db/schema/employees";

class Department {
  postDepartment = async (departmentValues: department) => {
    await db.insert(departments).values(departmentValues);
  };

  getDepartments = async () => {
    const data = await db.select().from(departments);
    return data;
  };

  getDepartment = async (id: number) => {
    const data = await db
      .select()
      .from(departments)
      .limit(1)
      .where(eq(departments.id, id));
    return data[0];
  };

  async getDepartmentMembers(departmentId: number) {
    const departmentData = await db
      .select()
      .from(departments)
      .where(eq(departments.id, departmentId));

    if (!departmentData.length || !departmentData[0].membersId) {
      return [];
    }

    const membersId: string[] = departmentData[0].membersId as string[];
    const employeesData = await db
      .select()
      .from(employees)
      .where(inArray(employees.employeeId, membersId));
    return employeesData;
  }
}

export const departmentClass = new Department();
