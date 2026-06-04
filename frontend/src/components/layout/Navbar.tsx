import { Link, useLocation } from "react-router-dom";
import { useAppStore } from "@/stores/useAppStore";
import { cn } from "@/lib/utils";

const tabs = [
  { path: "/", label: "Dashboard", id: "dashboard" as const },
  { path: "/timeline", label: "Timeline", id: "timeline" as const },
  { path: "/map", label: "World Map", id: "map" as const },
];

export default function Navbar() {
  const location = useLocation();
  const { activeTab, setActiveTab } = useAppStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-mm-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-bold text-mm-green tracking-tight"
            onClick={() => setActiveTab("dashboard")}
          >
            Football History Explorer
          </Link>
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-all duration-300",
                  "hover:text-mm-green",
                  activeTab === tab.id || location.pathname === tab.path
                    ? "text-mm-green"
                    : "text-mm-gray-600"
                )}
              >
                {tab.label}
                {(activeTab === tab.id || location.pathname === tab.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-mm-green" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
