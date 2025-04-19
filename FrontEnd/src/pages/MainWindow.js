import { useNavigate } from "react-router-dom";
import './WebApp.css';

export default function MainWindow() {
    const navigate = useNavigate();

    return (
        <div className="mainWindow">
            <h1 className="mainTitle">Main Menu</h1>
            <div className="menuButtons">
                <button onClick={() => navigate("/Layout/AchivementPage")}>Achievements</button>
                <button onClick={() => navigate("/Layout/GoalPage")}>Goals</button>
                <button onClick={() => navigate("/Layout/GraphsPage")}>Graphs</button>
                <button onClick={() => navigate("/Layout/MoodPage")}>Mood Tracker</button>
                <button onClick={() => navigate("/Layout/Settings")}>Settings</button>
            </div>
        </div>
    );
}
