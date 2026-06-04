import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import DashboardPage from "./pages/DashboardPage";
import TimelinePage from "./pages/TimelinePage";
import TeamProfilePage from "./pages/TeamProfilePage";
import WorldMapPage from "./pages/WorldMapPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "timeline", element: <TimelinePage /> },
      { path: "team/:name", element: <TeamProfilePage /> },
      { path: "map", element: <WorldMapPage /> },
    ],
  },
]);
