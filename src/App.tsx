import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { MainLayout } from "./components/layout/MainLayout";

import { Dashboard } from "./pages/Dashboard";
import { Marketplace } from "./pages/Marketplace";
import { CodingHub } from "./pages/CodingHub";
import { ResourceHub } from "./pages/ResourceHub";
import { PlacementHub } from "./pages/PlacementHub";
import { TeamFinder } from "./pages/TeamFinder";
import { Community } from "./pages/Community";
import { LostFound } from "./pages/LostFound";
import { Tasks } from "./pages/Tasks";
import { Events } from "./pages/Events";
import { CalendarPage } from "./pages/CalendarPage";
import { Portfolio } from "./pages/Portfolio";
import { Achievements } from "./pages/Achievements";
import { SkillsPage } from "./pages/SkillsPage";
import { AIAssistantPage } from "./pages/AIAssistantPage";

function App() {
  return (
    <AppProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/coding" element={<CodingHub />} />
            <Route path="/resources" element={<ResourceHub />} />
            <Route path="/placements" element={<PlacementHub />} />
            <Route path="/teams" element={<TeamFinder />} />
            <Route path="/community" element={<Community />} />
            <Route path="/lost-found" element={<LostFound />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/events" element={<Events />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/ai" element={<AIAssistantPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </Router>
    </AppProvider>
  );
}

export default App;
