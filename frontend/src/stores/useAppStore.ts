import { create } from "zustand";

interface AppState {
  activeTab: "dashboard" | "timeline" | "team" | "map";
  isLoading: boolean;
  sidebarOpen: boolean;
  setActiveTab: (tab: AppState["activeTab"]) => void;
  setLoading: (loading: boolean) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeTab: "dashboard",
  isLoading: false,
  sidebarOpen: false,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setLoading: (loading) => set({ isLoading: loading }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
