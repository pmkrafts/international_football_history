import { useFilterStore } from "@/stores/useFilterStore";

export default function FilterBar() {
  const { selectedTeam, selectedTournament, clearFilters } = useFilterStore();
  const hasFilters = selectedTeam || selectedTournament;

  return (
    <div className="flex items-center gap-4 mb-6">
      {hasFilters && (
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-surface border border-border-pitch rounded-lg text-sm text-muted hover:text-accent-green hover:border-accent-green transition-colors"
        >
          Clear Filters
        </button>
      )}
      {selectedTeam && (
        <span className="px-3 py-1 bg-accent-green/10 text-accent-green rounded-full text-sm">
          Team: {selectedTeam}
        </span>
      )}
      {selectedTournament && (
        <span className="px-3 py-1 bg-accent-gold/10 text-accent-gold rounded-full text-sm">
          Tournament: {selectedTournament}
        </span>
      )}
    </div>
  );
}
