import { useQuery } from "@tanstack/react-query";
import { api, type ApiParams } from "@/lib/api";

export function useMatches(params?: ApiParams) {
  return useQuery({
    queryKey: ["matches", params],
    queryFn: () => api.matches(params),
  });
}

export function useMatchDetail(date: string, home: string, away: string) {
  return useQuery({
    queryKey: ["match", date, home, away],
    queryFn: () => api.matchDetail(date, home, away),
    enabled: !!date && !!home && !!away,
  });
}

export function useDashboardStats(params?: ApiParams) {
  return useQuery({
    queryKey: ["dashboard-stats", params],
    queryFn: () => api.dashboardStats(params),
  });
}
