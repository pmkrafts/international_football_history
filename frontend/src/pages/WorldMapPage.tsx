import { useState } from "react";
import { useMapCountries, useCountryMatches } from "@/hooks/useMapData";
import PageWrapper from "@/components/layout/PageWrapper";
import MatchRow from "@/components/ui/MatchRow";
import type { Match } from "@/types";

export default function WorldMapPage() {
  const { data: countries, isLoading } = useMapCountries();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const { data: matches } = useCountryMatches(selectedCountry || "", { limit: 20 });

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-light mb-2">World Map</h1>
          <p className="text-muted">Explore matches by host country.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-surface border border-border-pitch rounded-xl p-6 max-h-[600px] overflow-y-auto">
            <h3 className="text-lg font-semibold text-light mb-4">Countries</h3>
            {isLoading ? (
              <div className="text-muted">Loading...</div>
            ) : (
              <div className="space-y-2">
                {countries?.countries?.map((c: { country: string; matches: number }) => (
                  <button
                    key={c.country}
                    onClick={() => setSelectedCountry(c.country)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      selectedCountry === c.country
                        ? "bg-accent-green/10 border border-accent-green"
                        : "bg-pitch border border-border-pitch hover:border-accent-green/50"
                    }`}
                  >
                    <span className="text-light">{c.country}</span>
                    <span className="text-accent-gold font-medium">{c.matches}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            {selectedCountry ? (
              <div className="bg-surface border border-border-pitch rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-border-pitch">
                  <h3 className="text-lg font-semibold text-light">Matches in {selectedCountry}</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-pitch">
                      <tr>
                        <th className="text-left py-3 px-4 text-muted text-sm font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-muted text-sm font-medium">Home</th>
                        <th className="text-center py-3 px-4 text-muted text-sm font-medium">Score</th>
                        <th className="text-left py-3 px-4 text-muted text-sm font-medium">Away</th>
                        <th className="text-left py-3 px-4 text-muted text-sm font-medium">Tournament</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matches?.data?.map((match: Match) => (
                        <MatchRow key={`${match.date}-${match.home_team}-${match.away_team}`} match={match} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-surface border border-border-pitch rounded-xl p-12 text-center">
                <p className="text-muted">Select a country to view matches.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
