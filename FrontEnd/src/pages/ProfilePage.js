import { useEffect, useState } from "react";
import axios from "axios";
import "./ProfilePage.css";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = "some-user-id"; // Replace with the actual user ID, possibly from a context or auth system

    // Fallback built-in user for testing when backend is down
    const fallbackUser = {
        name: "Alex Runner",
        profilePic: "https://via.placeholder.com/120",
        userStatistics: {
            totalDistance: 125.4,
            avgPace: "5:12 /km"
        },
        workouts: [
            // Fallback workout data for testing
            {
                id: "1",
                dateTime: "2022-10-10T08:30:00",
                splits: [
                    {
                        distance: 10,
                        speed: 5.0,
                        heartRate: 150
                    },
                    {
                        distance: 20,
                        speed: 5.1,
                        heartRate: 155
                    }
                ]
            }
        ]
    };

    // Fetch user data from the backend
    useEffect(() => {
        axios.get(`/users/${userId}/data`)
            .then(response => {
                setUser(response.data); // Set the user data received from backend
                setLoading(false); // Data loaded, stop loading state
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                // Use fallback user if backend fails
                setUser(fallbackUser);
                setLoading(false);
            });
    }, [userId]);

    // Show loading screen while fetching data
    if (loading) return <div>Loading...</div>;

    // Check if the user is null or missing important data
    if (!user) return <div>No user data available</div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img
                    src={user.profilePic || "https://via.placeholder.com/120"}
                    alt="Profile"
                    className="profile-pic"
                />
                <h1>{user.name}</h1>
            </div>

            {/* Display stats */}
            <div className="profile-stats">
                <div className="stat-box">
                    <h2>{user.userStatistics?.totalDistance || 0} km</h2>
                    <p>Total Distance</p>
                </div>
                <div className="stat-box">
                    <h2>{user.workouts?.length || 0}</h2>
                    <p>Runs Completed</p>
                </div>
                <div className="stat-box">
                    <h2>{user.userStatistics?.avgPace || "N/A"}</h2>
                    <p>Avg Pace</p>
                </div>
            </div>

            {/* View past runs */}
            <div className="runs-link">
                <button onClick={() => window.location.href = "/Layout/RunList"}>View Past Runs</button>
            </div>
        </div>
    );
}
