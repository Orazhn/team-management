import { useQuery } from "@tanstack/react-query";
import { employeesClass } from "@/services/employees.service";
export function useGetEmployee(id: string) {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: [`employee ${id}`],
    queryFn: () => employeesClass.getEmployee(id),
    enabled: !!id,
  });

  return {
    employee: data,
    isPending,
    isSuccess,
  };
}
