import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export function useTimeline(params?: any) {
  return useQuery({
    queryKey: ["timeline", params],
    queryFn: () => api.timeline(params),
  });
}

export function useTrends(groupBy: string = "year") {
  return useQuery({
    queryKey: ["trends", groupBy],
    queryFn: () => api.trends({ group_by: groupBy }),
  });
}
