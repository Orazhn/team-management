import { useQuery } from "@tanstack/react-query";
import { holidaysClass } from "@/services/holidays.service";

export function useGetHolidays() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get holidays"],
    queryFn: () => holidaysClass.getHolidays(),
  });

  return {
    holidays: data,
    isLoading,
    refetch,
  };
}
