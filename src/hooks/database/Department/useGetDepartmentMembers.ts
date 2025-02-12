import { useQuery } from "@tanstack/react-query";
import { departmentClass } from "@/services/department.service";
import { IEmployee } from "@/types/employee";

export const useGetDepartmentMembers = (departmentId: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ["departmentEmployees", departmentId],
    queryFn: () => departmentClass.getDepartmentMembers(departmentId),
    enabled: !!departmentId,
  });
  return { members: data as unknown as IEmployee[], isLoading };
};
