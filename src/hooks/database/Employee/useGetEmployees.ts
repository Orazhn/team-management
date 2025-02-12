import { useQuery } from "@tanstack/react-query";
import { employeesClass } from "@/services/employees.service";
import { IEmployee } from "@/types/employee";

export function useGetEmployees() {
  const { data, isLoading } = useQuery({
    queryKey: ["get employees"],
    queryFn: () => employeesClass.getEmployees(),
  });

  return {
    employees: data as unknown as IEmployee[],
    isLoading,
  };
}
