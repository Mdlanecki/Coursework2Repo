import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RunListPage.css";

export default function RunListPage() {
    const [runs, setRuns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const userId = "some-user-id"; // Replace with the actual user ID, possibly from a context or auth system

    // Fallback dummy runs for testing
    const dummyRuns = [
        { id: "1", date: "2025-04-20", distance: 10.2, duration: "00:52:30" },
        { id: "2", date: "2025-04-18", distance: 5.3, duration: "00:26:12" },
        { id: "3", date: "2025-04-15", distance: 12.0, duration: "01:01:15" }
    ];

    // Fetch the user's runs data from the backend
    useEffect(() => {
        axios.get(`/users/${userId}/data`)
            .then(response => {
                // Extract and format the runs
                const userRuns = response.data.workouts.map(workout => ({
                    id: workout.id,
                    date: new Date(workout.dateTime).toLocaleDateString(),
                    distance: workout.splits.reduce((total, split) => total + split.distance, 0), // Total distance of the workout
                    duration: workout.splits.reduce((total, split) => total + split.timeStamp, 0) // Total duration of the workout (example calculation)
                }));
                setRuns(userRuns);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                setRuns(dummyRuns); // Fall back to dummy runs if error occurs
                setLoading(false);
            });
    }, [userId]);

    // Show loading screen while fetching data
    if (loading) return <div>Loading...</div>;

    // Show error if no runs are found
    if (error) return <div>Error loading runs</div>;

    return (
        <div className="runlist-container">
            <h2>Past Runs</h2>
            <ul className="run-list">
                {runs.length === 0 ? (
                    <li>No runs available.</li>
                ) : (
                    runs.map(run => (
                        <li key={run.id} onClick={() => navigate(`/Layout/RunDetail/${run.id}`)}>
                            <span>{run.date}</span>
                            <span>{run.distance} km</span>
                            <span>{run.duration}</span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
