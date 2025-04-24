import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MapContainer, TileLayer, Polyline } from "react-leaflet"; // Leaflet map for route
import "./RunDetailsPage.css"; // You can style this page as needed

const RunDetailsPage = ({ userId, workoutId }) => {
    const [workoutData, setWorkoutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Dummy data for fallback in case of error
    const dummyWorkout = {
        id: "1",
        date: "2025-04-20",
        distance: 10.2,
        duration: "00:52:30",
        splits: [
            { distance: 2.5, timeStamp: 600, heartRate: 145, cadence: 85, latitude: 51.505, longitude: -0.09, altitude: 100 },
            { distance: 2.5, timeStamp: 600, heartRate: 150, cadence: 87, latitude: 51.515, longitude: -0.10, altitude: 105 },
            { distance: 2.5, timeStamp: 600, heartRate: 155, cadence: 88, latitude: 51.525, longitude: -0.11, altitude: 110 },
            { distance: 2.5, timeStamp: 600, heartRate: 160, cadence: 90, latitude: 51.535, longitude: -0.12, altitude: 115 }
        ]
    };

    useEffect(() => {
        // Fetch workout data from the backend by the workoutId
        axios.get(`/users/${userId}/workouts/${workoutId}`)
            .then(response => {
                setWorkoutData(response.data);  // Set the workout data to the state
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching workout data:", error);
                setWorkoutData(dummyWorkout);  // Fallback to dummy data
                setLoading(false);
            });
    }, [userId, workoutId]);

    // Loading state
    if (loading) return <div>Loading...</div>;

    // Error handling
    if (!workoutData) return <div>Error loading workout details.</div>;

    const splits = workoutData.splits;

    // Prepare data for charts
    const heartRateData = splits.map(split => ({ distance: split.distance, heartRate: split.heartRate }));
    const speedData = splits.map(split => ({ distance: split.distance, speed: split.speed }));
    const elevationData = splits.map(split => ({ distance: split.distance, altitude: split.altitude }));
    const cadenceData = splits.map(split => ({ distance: split.distance, cadence: split.cadence }));

    // Create an array of positions for the map Polyline
    const routeCoordinates = splits.map(split => [split.latitude, split.longitude]);

    return (
        <div className="run-details-container">
            <h2 className="run-details-heading">Workout Details</h2>

            {/* Map showing workout route */}
            <MapContainer center={[routeCoordinates[0][0], routeCoordinates[0][1]]} zoom={13} style={{ height: "300px" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Polyline positions={routeCoordinates} color="blue" />
            </MapContainer>

            {/* Graphs */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <div style={{ width: "48%" }}>
                    <h3>Heart Rate vs Distance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={heartRateData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="distance" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="heartRate" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div style={{ width: "48%" }}>
                    <h3>Speed vs Distance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={speedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="distance" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="speed" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <div style={{ width: "48%" }}>
                    <h3>Elevation vs Distance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={elevationData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="distance" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="altitude" stroke="#ff7300" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div style={{ width: "48%" }}>
                    <h3>Cadence vs Distance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={cadenceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="distance" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="cadence" stroke="#387908" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default RunDetailsPage;
