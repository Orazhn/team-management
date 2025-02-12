import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payrollClass } from "@/services/payroll.service";
import { IPayroll } from "@/types/payroll";

export function usePostPayroll() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationKey: ["post payroll"],
    mutationFn: (payroll: IPayroll) => payrollClass.postPayroll(payroll),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get payrolls"] });
    },
  });

  return {
    postPayroll: mutateAsync,
    isPending,
    isSuccess,
  };
}
