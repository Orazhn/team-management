import { useMutation } from "@tanstack/react-query";
import { employeesClass } from "@/services/employees.service";
import {
  IPersonalInformation,
  IAccountAccess,
  IProfessionalInformation,
} from "@/types/employee";
import { memberType, status } from "@/types/mainEnums";

export function usePostEmployee() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["post employee"],
    mutationFn: modifyEmployeeData,
  });

  return {
    postEmployee: mutateAsync,
    isPending,
  };
}

function modifyEmployeeData(data: {
  personalInfoData: IPersonalInformation;
  professionalInfoData: IProfessionalInformation;
  accountAccessData: IAccountAccess;
}) {
  const dataToSend = {
    employee: {
      employeeId: data.professionalInfoData.employeeId,
      firstName: data.personalInfoData.firstName,
      lastName: data.personalInfoData.lastName,
      email: data.personalInfoData.email,
      employeeName: `${data.personalInfoData.firstName} ${data.personalInfoData.lastName}`,
      designation: data.professionalInfoData.designation,
      employeeType: data.professionalInfoData.employeeType as memberType,
      status: "Permanent" as status,
      departmentName: data.professionalInfoData.departmentName,
      departmentId: +data.professionalInfoData.departmentId,
    },
    personalInformationData: data.personalInfoData,
    professionalInformationData: data.professionalInfoData,
    accountAccessData: data.accountAccessData,
  };
  return employeesClass.postEmployee(dataToSend);
}
