import db from "@/db/drizzle";
import { employees } from "@/db/schema/employees";
import { departments } from "@/db/schema/departments";
import { accountAccessInformation } from "@/db/schema/account_access";
import { professionalInformation } from "@/db/schema/professional_information";
import { personalInformation } from "@/db/schema/personal_information";
import {
  IAccountAccess,
  IEmployee,
  IPersonalInformation,
  IProfessionalInformation,
} from "@/types/employee";
import { eq } from "drizzle-orm";

class Employees {
  getEmployees = async () => {
    const employeesData = await db.select().from(employees);
    return employeesData;
  };

  postEmployee = async (employeeData: {
    employee: IEmployee;
    accountAccessData: IAccountAccess;
    personalInformationData: IPersonalInformation;
    professionalInformationData: IProfessionalInformation;
  }) => {
    await db.insert(employees).values(employeeData.employee);
    await db
      .insert(accountAccessInformation)
      .values(employeeData.accountAccessData);
    await db
      .insert(personalInformation)
      .values(employeeData.personalInformationData);
    await db
      .insert(professionalInformation)
      .values(employeeData.professionalInformationData);
    const departmentMembersId = await db
      .select({ membersId: departments.membersId })
      .from(departments)
      .where(eq(departments.id, employeeData.employee.departmentId));
    const membersId =
      departmentMembersId.length > 0
        ? departmentMembersId[0].membersId
        : [employeeData.employee.employeeId];
    await db
      .update(departments)
      .set({
        membersId: [
          ...(membersId as string[]),
          employeeData.employee.employeeId,
        ],
      })
      .where(eq(departments.id, employeeData.employee.departmentId));
  };

  deleteEmployee = async (id: string) => {
    await db.delete(employees).where(eq(employees.employeeId, id));
  };

  getEmployee = async (id: string) => {
    const employeeData = await db
      .select()
      .from(employees)
      .where(eq(employees.employeeId, id))
      .limit(1);

    const professionalInformationData = await db
      .select()
      .from(professionalInformation)
      .where(eq(professionalInformation.employeeId, id))
      .limit(1);

    const personalInformationData = await db
      .select()
      .from(personalInformation)
      .where(eq(personalInformation.employeeId, id))
      .limit(1);

    const accountAccessInformationData = await db
      .select()
      .from(accountAccessInformation)
      .where(eq(accountAccessInformation.employeeId, id))
      .limit(1);

    return {
      employee: employeeData[0],
      professionalInformation: professionalInformationData[0],
      personalInformation: personalInformationData[0],
      accountAccessInformation: accountAccessInformationData[0],
    };
  };
  updateEmployee = async (employeeData: {
    employee: IEmployee;
    accountAccessData: IAccountAccess;
    personalInformationData: IPersonalInformation;
    professionalInformationData: IProfessionalInformation;
  }) => {
    const {
      employee,
      accountAccessData,
      personalInformationData,
      professionalInformationData,
    } = employeeData;
    const columnID = employees.employeeId;
    await db
      .update(employees)
      .set(employee)
      .where(eq(columnID, employee.employeeId));
    await db
      .update(accountAccessInformation)
      .set(accountAccessData)
      .where(eq(columnID, employee.employeeId));
    await db
      .update(personalInformation)
      .set(personalInformationData)
      .where(eq(columnID, employee.employeeId));
    await db
      .update(professionalInformation)
      .set(professionalInformationData)
      .where(eq(columnID, employee.employeeId));
  };
}

export const employeesClass = new Employees();
