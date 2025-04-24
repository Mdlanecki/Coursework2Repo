import { useNavigate } from "react-router-dom";
import { FaTrophy, FaSmile, FaBullseye, FaChartLine, FaCogs, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./MainWindow.css";

export default function MainWindow() {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
    }, [darkMode]);

    return (
        <div className="main-dashboard">
            <h1 className="dashboard-heading">Welcome back, Athlete 🏃‍♂️</h1>
            <div className="button-grid">
                <button className="nav-button" onClick={() => navigate("/Layout/Profile")}>
                    <FaUser /> View Profile
                </button>
                <button className="nav-button" onClick={() => navigate("/Layout/AchivementPage")}>
                    <FaTrophy /> Achievements
                </button>
                <button className="nav-button" onClick={() => navigate("/Layout/GoalPage")}>
                    <FaBullseye /> Goals
                </button>
                <button className="nav-button" onClick={() => navigate("/Layout/GraphsPage")}>
                    <FaChartLine /> Workout Graphs
                </button>
                <button className="nav-button" onClick={() => navigate("/Layout/MoodPage")}>
                    <FaSmile /> Mood Tracker
                </button>
                <button className="nav-button" onClick={() => navigate("/Layout/Settings")}>
                    <FaCogs /> Settings
                </button>
            </div>
            <button className="toggle-button" onClick={() => setDarkMode(prev => !prev)}>
                Toggle {darkMode ? "Light" : "Dark"} Mode
            </button>
        </div>
    );
}
