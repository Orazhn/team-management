import { useQuery } from "@tanstack/react-query";
import { departmentClass } from "@/services/department.service";
import { department } from "@/types/departments";

export function useGetDepartments() {
  const { data, isLoading } = useQuery({
    queryKey: ["get departments"],
    queryFn: () => departmentClass.getDepartments(),
  });

  return {
    departments: (data || []) as unknown as department[],
    isLoading,
  };
}
