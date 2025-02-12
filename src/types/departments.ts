import { memberType, status } from "./mainEnums";

export interface departmentMember {
  employeeId: string;
  employeeName: string;
  designation: string;
  type: memberType;
  status: status;
  department_id: number;
  updated_at?: Date;
}
export interface department {
  id?: number;
  name: string;
  membersId: string[];
}
