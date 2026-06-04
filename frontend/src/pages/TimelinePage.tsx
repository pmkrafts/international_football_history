import { useTimeline } from "../../hooks/useTimeline";
import PageWrapper from "../../components/layout/PageWrapper";

export default function TimelinePage() {
  const { data, isLoading } = useTimeline();

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-light mb-2">Timeline</h1>
          <p className="text-muted">Scroll through football history from 1872 to 2025.</p>
        </div>

        {isLoading ? (
          <div className="text-center text-muted py-12">Loading timeline...</div>
        ) : (
          <div className="bg-surface border border-border-pitch rounded-xl p-6 overflow-x-auto">
            <div className="min-w-[1200px]">
              {data?.events?.slice(0, 100).map((event: any, i: number) => (
                <div key={i} className="flex items-center gap-4 py-2 border-b border-border-pitch">
                  <span className="w-24 text-muted text-sm shrink-0">{event.date}</span>
                  <span className="w-32 text-light font-medium shrink-0">{event.home_team}</span>
                  <span className="w-16 text-center text-accent-green font-bold shrink-0">
                    {event.home_score} - {event.away_score}
                  </span>
                  <span className="w-32 text-light font-medium shrink-0">{event.away_team}</span>
                  <span className="text-muted text-sm truncate">{event.tournament}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
