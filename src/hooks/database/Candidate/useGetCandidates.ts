import { useQuery } from "@tanstack/react-query";
import { candidateClass } from "@/services/candidates.service";

export function useGetCandidates() {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["get candidates"],
    queryFn: () => candidateClass.getCandidates(),
  });

  return {
    candidates: data,
    isPending,
    isSuccess,
  };
}
