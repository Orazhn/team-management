import { status, memberType } from "./mainEnums";

export interface IEmployee {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  employeeName: string;
  designation: string;
  employeeType: memberType;
  status: status;
  departmentId: number;
  departmentName: string;
  updated_at?: Date;
}

export interface IAccountAccess {
  employeeId: string;
  email: string;
  slackID: string;
  skypeID: string;
  githubID: string;
}

export interface IPersonalInformation {
  firstName: string;
  lastName: string;
  employeeId: string;
  dateOfBirth: string;
  email: string;
  maritalStatus: string;
  mobileNumber: string;
  gender: string | null;
  nationality: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}
export interface IProfessionalInformation {
  employeeId: string;
  userName: string;
  employeeType: string;
  email: string;
  departmentName: string;
  departmentId: string;
  designation: string;
  workingDays: string[];
  joiningDate: string;
  officeLocation: string;
}
