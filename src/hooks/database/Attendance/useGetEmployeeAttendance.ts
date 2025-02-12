import { useQuery } from "@tanstack/react-query";
import { attendanceClass } from "@/services/attendance.service";

export function useGetEmployeeAttendance(id: string) {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: [`employee attendance ${id}`],
    queryFn: () => attendanceClass.getEmployeeAttendance(id),
    enabled: !!id,
  });

  return {
    attendances: data,
    isPending,
    isSuccess,
  };
}
