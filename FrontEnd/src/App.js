import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./pages/DashboardLayout"; // new sidebar layout
import SignIn from "./pages/SignIn";
import TakeMood from "./pages/TakeMood";
import MainWindow from "./pages/MainWindow";
import AchivementPage from "./pages/AchivementPage";
import GoalPage from "./pages/GoalPage";
import GraphsPage from "./pages/GraphsPage";
import MoodPage from "./pages/MoodPage";
import Settings from "./pages/Settings";
import ProfilePage from "./pages/ProfilePage"; // New Profile Page
import RunDetailPage from "./pages/RunDetailsPage";
import RunListPage from "./pages/RunListPage"; // New Run Details Page

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/TakeMood" element={<TakeMood />} />
                <Route path="/Layout" element={<DashboardLayout />}>
                    <Route index element={<MainWindow />} />
                    <Route path="MainWindow" element={<MainWindow />} />
                    <Route path="AchivementPage" element={<AchivementPage />} />
                    <Route path="GoalPage" element={<GoalPage />} />
                    <Route path="GraphsPage" element={<GraphsPage />} />
                    <Route path="MoodPage" element={<MoodPage />} />
                    <Route path="Settings" element={<Settings />} />

                    {/* New Profile Page */}
                    <Route path="Profile" element={<ProfilePage />} />
                    <Route path="RunList" element={<RunListPage />} />
                    <Route path="RunDetail/:runId" element={<RunDetailPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
