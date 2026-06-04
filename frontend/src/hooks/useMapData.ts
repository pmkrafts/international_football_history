import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export function useMapCountries() {
  return useQuery({
    queryKey: ["map-countries"],
    queryFn: () => api.mapCountries(),
  });
}

export function useCountryMatches(country: string, params?: any) {
  return useQuery({
    queryKey: ["country-matches", country, params],
    queryFn: () => api.countryMatches(country, params),
    enabled: !!country,
  });
}
