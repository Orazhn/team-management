import { useMutation, useQueryClient } from "@tanstack/react-query";
import { holidaysClass } from "@/services/holidays.service";
import { IHoliday } from "@/types/holiday";

export function usePostHoliday() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationKey: ["post holiday"],
    mutationFn: (holiday: IHoliday) => holidaysClass.postHoliday(holiday),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get holidays"] });
    },
  });

  return {
    postHoliday: mutateAsync,
    isPending,
    isSuccess,
  };
}
