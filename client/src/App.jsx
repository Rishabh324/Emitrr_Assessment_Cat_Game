import "./App.css";
import { Route, Routes } from "react-router-dom";
import InstructionPage from "./pages/InstructionPage";
import GamePage from "./pages/GamePage";
import LeaderboardPage from "./pages/LeaderboardPage";

function App() {

  return (
    <div className="bg-blue-300 h-screen">
      <Routes>
        <Route path="/" element={<InstructionPage />} />
        <Route path="/play-game" element={<GamePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </div>
  );
}

export default App;
