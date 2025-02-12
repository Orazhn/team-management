import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobClass } from "@/services/jobs.service";

export function useDeleteJob() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: [`delete job`],
    mutationFn: (id: number) => jobClass.deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get jobs"] });
    },
  });
  return {
    deleteJob: mutate,
    isDeleting: isPending,
    isSuccess,
  };
}
