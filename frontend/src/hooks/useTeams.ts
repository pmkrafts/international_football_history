import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export function useTeams(params?: any) {
  return useQuery({
    queryKey: ["teams", params],
    queryFn: () => api.teams(params),
  });
}

export function useTeamProfile(name: string) {
  return useQuery({
    queryKey: ["team", name],
    queryFn: () => api.teamProfile(name),
    enabled: !!name,
  });
}

export function useTeamMatches(name: string, params?: any) {
  return useQuery({
    queryKey: ["team-matches", name, params],
    queryFn: () => api.teamMatches(name, params),
    enabled: !!name,
  });
}

export function useTeamRivals(name: string, params?: any) {
  return useQuery({
    queryKey: ["team-rivals", name, params],
    queryFn: () => api.teamRivals(name, params),
    enabled: !!name,
  });
}

export function useTeamScorers(name: string, params?: any) {
  return useQuery({
    queryKey: ["team-scorers", name, params],
    queryFn: () => api.teamScorers(name, params),
    enabled: !!name,
  });
}
