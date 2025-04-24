// DashboardLayout.js
import { Outlet, useNavigate } from "react-router-dom";
import {
    FaTrophy,
    FaSmile,
    FaBullseye,
    FaChartLine,
    FaCogs,
    FaHome,
    FaUser
} from "react-icons/fa";
import "./DashboardLayout.css";

export default function DashboardLayout() {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2 className="logo" onClick={() => navigate("/")}>🏃‍♂️ FitDash</h2>
                <nav className="nav-links">
                    <button onClick={() => navigate("/Layout/MainWindow")}><FaHome /> Home</button>
                    <button onClick={() => navigate("/Layout/Profile")}><FaUser /> Profile</button>
                    <button onClick={() => navigate("/Layout/AchivementPage")}><FaTrophy /> Achievements</button>
                    <button onClick={() => navigate("/Layout/GoalPage")}><FaBullseye /> Goals</button>
                    <button onClick={() => navigate("/Layout/GraphsPage")}><FaChartLine /> Graphs</button>
                    <button onClick={() => navigate("/Layout/MoodPage")}><FaSmile /> Mood</button>
                    <button onClick={() => navigate("/Layout/Settings")}><FaCogs /> Settings</button>
                </nav>
            </aside>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}
