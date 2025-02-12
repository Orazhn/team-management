import { useMutation, useQueryClient } from "@tanstack/react-query";
import { attendanceClass } from "@/services/attendance.service";
import { IAttendance } from "@/types/attendance";

export function usePostAttendance() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationKey: ["post attendance"],
    mutationFn: (attendance: IAttendance) =>
      attendanceClass.postAttendance(attendance),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get attendances"] });
    },
  });

  return {
    postAttendance: mutateAsync,
    isPending,
    isSuccess,
  };
}
