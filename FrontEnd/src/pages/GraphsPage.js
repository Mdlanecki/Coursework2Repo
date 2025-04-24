import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FaChartLine } from "react-icons/fa";
import "./GraphsPage.css";

export default function GraphsPage() {
    const data = [
        { distance: 5, pace: 6.2, heartRate: 130 },
        { distance: 10, pace: 6.1, heartRate: 132 },
        { distance: 15, pace: 6.3, heartRate: 128 },
        { distance: 20, pace: 6.0, heartRate: 135 },
        { distance: 25, pace: 5.8, heartRate: 140 },
        { distance: 30, pace: 5.9, heartRate: 145 }
    ];

    return (
        <div className="graphs-container">
            <h1><FaChartLine /> Running Stats</h1>

            <div className="graphs">
                {/* Distance vs Pace Line Chart */}
                <div className="graph-card">
                    <h2>Distance vs Pace</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="distance" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pace" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Distance vs Heart Rate Line Chart */}
                <div className="graph-card">
                    <h2>Distance vs Heart Rate</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="distance" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="heartRate" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
