import { leaveStatus } from "./mainEnums";
export interface ILeave {
  employeeId: string;
  startDate: Date;
  endDate: Date;
  days: number;
  reportingManager: string;
  status: leaveStatus;
}
