import { useQuery } from "@tanstack/react-query";
import { jobClass } from "@/services/jobs.service";

export function useGetJobs() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get jobs"],
    queryFn: () => jobClass.getJobs(),
  });

  return {
    jobs: data,
    isLoading,
    refetch,
  };
}
