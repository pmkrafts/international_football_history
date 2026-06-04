import { create } from "zustand";

interface FilterState {
  dateRange: [Date | null, Date | null];
  selectedTeam: string | null;
  selectedTournament: string | null;
  neutralOnly: boolean;
  setDateRange: (range: FilterState["dateRange"]) => void;
  setTeam: (team: string | null) => void;
  setTournament: (tournament: string | null) => void;
  setNeutralOnly: (neutral: boolean) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  dateRange: [null, null],
  selectedTeam: null,
  selectedTournament: null,
  neutralOnly: false,
  setDateRange: (range) => set({ dateRange: range }),
  setTeam: (team) => set({ selectedTeam: team }),
  setTournament: (tournament) => set({ selectedTournament: tournament }),
  setNeutralOnly: (neutral) => set({ neutralOnly: neutral }),
  clearFilters: () => set({ dateRange: [null, null], selectedTeam: null, selectedTournament: null, neutralOnly: false }),
}));
