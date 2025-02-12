import { useQuery } from "@tanstack/react-query";
import { departmentClass } from "@/services/department.service";

export function useGetDepartment(id: string) {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: [`department ${id}`],
    queryFn: () => departmentClass.getDepartment(+id),
  });

  return {
    department: data,
    isPending,
    isSuccess,
  };
}
