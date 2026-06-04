import { useDashboardStats } from "@/hooks/useMatches";
import { useTrends } from "@/hooks/useTimeline";
import { useMatches } from "@/hooks/useMatches";
import KpiCard from "@/components/ui/KpiCard";
import MatchRow from "@/components/ui/MatchRow";
import FilterBar from "@/components/ui/FilterBar";
import PageWrapper from "@/components/layout/PageWrapper";
import SkeletonCard from "@/components/ui/SkeletonCard";
import type { Match } from "@/types";

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: trends } = useTrends("decade");
  const { data: matches } = useMatches({ limit: 50, sort: "date_desc" });

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-light mb-2">Dashboard</h1>
          <p className="text-muted">Explore 49,016 international football matches from 1872 to 2025.</p>
        </div>

        <FilterBar />

        {statsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KpiCard title="Total Matches" value={stats?.total_matches || 0} />
            <KpiCard title="Total Goals" value={stats?.total_goals || 0} />
            <KpiCard title="Avg Goals/Match" value={stats?.avg_goals_per_match || 0} />
            <KpiCard title="Most Active Decade" value={parseInt(stats?.most_active_decade || "0")} suffix="s" />
          </div>
        )}

        {trends && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-surface border border-border-pitch rounded-xl p-6">
              <h3 className="text-lg font-semibold text-light mb-4">Matches per Decade</h3>
              <div className="space-y-2">
                {trends.trends?.map((t: { period: string; matches: number }) => (
                  <div key={t.period} className="flex items-center">
                    <span className="w-16 text-muted text-sm">{t.period}s</span>
                    <div className="flex-1 h-4 bg-border-pitch rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-green rounded-full transition-all"
                        style={{ width: `${Math.min((t.matches / 10000) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="w-16 text-right text-light text-sm">{t.matches.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface border border-border-pitch rounded-xl p-6">
              <h3 className="text-lg font-semibold text-light mb-4">Top Tournaments</h3>
              <div className="space-y-2">
                {stats?.top_tournaments?.map((t: { tournament: string; count: number }) => (
                  <div key={t.tournament} className="flex items-center justify-between">
                    <span className="text-light text-sm">{t.tournament}</span>
                    <span className="text-accent-gold font-medium">{t.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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
                  <th className="text-left py-3 px-4 text-muted text-sm font-medium">Country</th>
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
      </div>
    </PageWrapper>
  );
}
