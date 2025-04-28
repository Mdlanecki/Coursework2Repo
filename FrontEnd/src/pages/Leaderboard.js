import { useNavigate } from "react-router-dom";
import './WebApp.css';

import React, { useEffect, useState } from "react";

function Leaderboard() {
    const navigate = useNavigate();
    const [leaderboards, setLeaderboards] = useState([]);

    useEffect(() => {
        fetch("http://172.26.42.147:8080/users/Leaderboard")  // Adjust URL if needed
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch leaderboards");
                }
                return response.json();
            })
            .then(data => {
                setLeaderboards(data);  // Expecting data to be an array of arrays
            })
            .catch(error => {
                console.error("Error fetching leaderboards:", error);
            });
    }, []);

    return (
        <div className="leaderboardPage">
            <h1 className="leaderboardPageTitle">Leaderboard</h1>
            <div className="leaderboardGrid">
                {leaderboards.map((board, i) => (
                    <div key={i} className="leaderboardContainer">
                        <h2 className="leaderboardTitle">Leaderboard {i + 1}</h2>
                        <ul className="leaderboardList">
                            {board.map((entry, index) => (
                                <li key={index} className="leaderboardItem">
                                    <span className="rank">{index + 1}.</span>
                                    <span className="name">{entry[0]}</span>
                                    <span className="score">{entry[1]}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <button className='back' onClick={() => navigate('/Layout/MainWindow')}>Back</button>
        </div>
    );
}

export default Leaderboard;
