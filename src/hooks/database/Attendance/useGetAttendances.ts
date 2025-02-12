import { useQuery } from "@tanstack/react-query";
import { attendanceClass } from "@/services/attendance.service";

export function useGetAttendances() {
  const { data, isLoading } = useQuery({
    queryKey: ["get attendances"],
    queryFn: () => attendanceClass.getAttendances(),
  });

  return {
    attendances: data,
    isLoading,
  };
}
