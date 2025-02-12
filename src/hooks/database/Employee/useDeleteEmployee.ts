import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employeesClass } from "@/services/employees.service";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending } = useMutation({
    mutationKey: [`delete employee`],
    mutationFn: (id: string) => employeesClass.deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get employees"] });
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });
  return {
    deleteEmployee: mutate,
    mutateAsync,
    isDeleting: isPending,
  };
}
