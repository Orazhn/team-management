import { useQuery } from "@tanstack/react-query";
import { payrollClass } from "@/services/payroll.service";

export function useGetPayrolls() {
  const { data, isLoading } = useQuery({
    queryKey: ["get payrolls"],
    queryFn: () => payrollClass.getPayrolls(),
  });

  return {
    payrolls: data,
    isLoading,
  };
}
