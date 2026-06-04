import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import PitchCanvas from "./components/layout/PitchCanvas";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import { useLenis } from "./hooks/useLenis";

export default function App() {
  useLenis();

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-pitch text-light">
        <PitchCanvas />
        <Navbar />
        <main className="relative z-10 pt-20">
          <Outlet />
        </main>
      </div>
    </ErrorBoundary>
  );
}
