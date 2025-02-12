import { useMutation, useQueryClient } from "@tanstack/react-query";
import { candidateClass } from "@/services/candidates.service";
import { ICandidate } from "@/types/candidate";

export function usePostCandidate() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationKey: ["post candidate"],
    mutationFn: (candidate: ICandidate) =>
      candidateClass.postCandidate(candidate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get candidates"] });
    },
  });

  return {
    postCandidate: mutateAsync,
    isPending,
    isSuccess,
  };
}
