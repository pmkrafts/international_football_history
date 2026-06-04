import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import PitchCanvas from "./components/layout/PitchCanvas";

export default function App() {
  return (
    <div className="relative min-h-screen bg-pitch text-light">
      <PitchCanvas />
      <Navbar />
      <main className="relative z-10 pt-20">
        <Outlet />
      </main>
    </div>
  );
}
