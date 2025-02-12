import db from "@/db/drizzle";
import { payrolls } from "@/db/schema/payrolls";
import { IPayroll } from "@/types/payroll";

class Payroll {
  postPayroll = async (payroll: IPayroll) => {
    await db.insert(payrolls).values(payroll);
  };

  getPayrolls = async () => {
    const data = await db.select().from(payrolls);
    return data;
  };
}

export const payrollClass = new Payroll();
