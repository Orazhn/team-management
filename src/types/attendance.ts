import { memberType, attendanceStatus } from "./mainEnums";
export interface IAttendance {
  id?: number;
  employeeId: string;
  employeeName: string;
  designation: string;
  employeeType: memberType;
  checkIn: string;
  checkOut: string;
  break: string;
  workingHours: string;
  attendanceStatus: attendanceStatus;
  date: string;
}
