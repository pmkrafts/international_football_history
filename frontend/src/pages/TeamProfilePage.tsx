import { useParams } from "react-router-dom";
import { useTeamProfile, useTeamMatches, useTeamRivals, useTeamScorers } from "@/hooks/useTeams";
import PageWrapper from "@/components/layout/PageWrapper";
import MatchRow from "@/components/ui/MatchRow";
import type { Match } from "@/types";

export default function TeamProfilePage() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name || "");
  const { data: profile, isLoading: profileLoading } = useTeamProfile(decodedName);
  const { data: matches } = useTeamMatches(decodedName, { limit: 20 });
  const { data: rivals } = useTeamRivals(decodedName, { limit: 10 });
  const { data: scorers } = useTeamScorers(decodedName, { limit: 10 });

  if (profileLoading) {
    return (
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted py-12">Loading team profile...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-light mb-2">{profile?.name}</h1>
          {profile?.former_names?.length > 0 && (
            <div className="flex gap-2 mb-4">
              {profile.former_names.map((n: string) => (
                <span key={n} className="px-2 py-1 bg-surface border border-border-pitch rounded text-xs text-muted">
                  Formerly: {n}
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-6 text-lg">
            <span className="text-win-green font-bold">{profile?.wins}W</span>
            <span className="text-draw-gold font-bold">{profile?.draws}D</span>
            <span className="text-loss-red font-bold">{profile?.losses}L</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface border border-border-pitch rounded-xl p-6">
            <h3 className="text-lg font-semibold text-light mb-4">Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted">Total Matches</span>
                <span className="text-light font-medium">{profile?.total_matches}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Goals For</span>
                <span className="text-light font-medium">{profile?.goals_for}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Goals Against</span>
                <span className="text-light font-medium">{profile?.goals_against}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Goal Difference</span>
                <span className="text-light font-medium">{(profile?.goals_for || 0) - (profile?.goals_against || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Win %</span>
                <span className="text-light font-medium">
                  {profile?.total_matches ? Math.round((profile.wins / profile.total_matches) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border-pitch rounded-xl p-6">
            <h3 className="text-lg font-semibold text-light mb-4">Top Rivals</h3>
            <div className="space-y-2">
              {rivals?.rivals?.map((r: { opponent: string; wins: number; draws: number; losses: number }) => (
                <div key={r.opponent} className="flex items-center justify-between">
                  <span className="text-light text-sm">{r.opponent}</span>
                  <span className="text-muted text-sm">{r.wins}W {r.draws}D {r.losses}L</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface border border-border-pitch rounded-xl p-6">
            <h3 className="text-lg font-semibold text-light mb-4">Top Scorers</h3>
            <div className="space-y-2">
              {scorers?.scorers?.map((s: { name: string; goals: number }) => (
                <div key={s.name} className="flex items-center justify-between">
                  <span className="text-light text-sm">{s.name}</span>
                  <span className="text-accent-gold font-medium">{s.goals}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border-pitch rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border-pitch">
            <h3 className="text-lg font-semibold text-light">Recent Matches</h3>
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
                  <MatchRow key={`${match.date}-${match.home_team}-${match.away_team}`} match={match} team={decodedName} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
