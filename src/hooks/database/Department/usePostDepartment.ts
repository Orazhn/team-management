import { useMutation, useQueryClient } from "@tanstack/react-query";
import { departmentClass } from "@/services/department.service";
import { department } from "@/types/departments";

export function usePostDepartment() {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isSuccess } = useMutation({
    mutationKey: ["post department"],
    mutationFn: (department: department) =>
      departmentClass.postDepartment(department),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get departments"] });
    },
  });

  return {
    postDepartment: mutate,
    mutateAsync,
    isPending,
    isSuccess,
  };
}
