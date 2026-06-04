const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface ApiParams {
  [key: string]: string | number | boolean | null | undefined;
}

async function fetcher(path: string, params?: ApiParams) {
  const url = new URL(`${API_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const api = {
  health: () => fetcher("/api/health"),
  matches: (params?: ApiParams) => fetcher("/api/matches", params),
  matchDetail: (date: string, home: string, away: string) => fetcher(`/api/matches/${date}/${home}/${away}`),
  teams: (params?: ApiParams) => fetcher("/api/teams", params),
  teamProfile: (name: string) => fetcher(`/api/teams/${encodeURIComponent(name)}`),
  teamMatches: (name: string, params?: ApiParams) => fetcher(`/api/teams/${encodeURIComponent(name)}/matches`, params),
  teamRivals: (name: string, params?: ApiParams) => fetcher(`/api/teams/${encodeURIComponent(name)}/rivals`, params),
  teamScorers: (name: string, params?: ApiParams) => fetcher(`/api/teams/${encodeURIComponent(name)}/scorers`, params),
  timeline: (params?: ApiParams) => fetcher("/api/timeline", params),
  dashboardStats: (params?: ApiParams) => fetcher("/api/stats/dashboard", params),
  trends: (params?: ApiParams) => fetcher("/api/stats/trends", params),
  mapCountries: () => fetcher("/api/map/countries"),
  countryMatches: (country: string, params?: ApiParams) => fetcher(`/api/map/countries/${encodeURIComponent(country)}/matches`, params),
};
