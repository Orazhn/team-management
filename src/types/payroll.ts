import { payrollStatus } from "./mainEnums";

export interface IPayroll {
  employeeId: string;
  employeeName: string;
  ctc: number;
  salary: number;
  deduction: number | null;
  status: payrollStatus;
}
