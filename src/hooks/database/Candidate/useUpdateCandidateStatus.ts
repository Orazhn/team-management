import { useMutation, useQueryClient } from "@tanstack/react-query";
import { candidateClass } from "@/services/candidates.service";
import { candidateStatus } from "@/types/mainEnums";

export function useUpdateCandidateStatus() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationKey: ["update candidate"],
    mutationFn: (status: candidateStatus) =>
      candidateClass.updateCandidateStatus(status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get candidates"] });
    },
  });

  return {
    updateCandidateStatus: mutateAsync,
    isPending,
    isSuccess,
  };
}
