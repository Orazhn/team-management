import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobClass } from "@/services/jobs.service";
import { IJob } from "@/types/job";

export function usePostJob() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationKey: ["post job"],
    mutationFn: (job: IJob) => jobClass.postJob(job),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get jobs"] });
    },
  });

  return {
    postJob: mutateAsync,
    isPending,
    isSuccess,
  };
}
