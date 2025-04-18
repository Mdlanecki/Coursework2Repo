import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const emojis = [
    "😭", "😰", "😢", "🥲", "😐", "🙂", "😄",
    "😁", "😆", "🤩"
];

const TakeMood = () => {
    const [value, setValue] = useState(5);              // current slider value
    const [values, setValues] = useState([]); // Array to store slider values
    const [dates, setDates] = useState([]); //Array to store date values
    const navigate = useNavigate();

    // Load history from localStorage when component mounts
    useEffect(() => {
        const storedValues = localStorage.getItem("sliderValues");
        const storedDates = localStorage.getItem("sliderDates");

        if (storedValues && storedDates) {
            setValues(JSON.parse(storedValues));
            setDates(JSON.parse(storedDates));
        }
    }, []);

    const handleChange = (e) => {
        setValue(Number(e.target.value));
    };

    const handleRelease = () => {
        const currentDate = new Date().toLocaleDateString(); // Get current date in the format MM/DD/YYYY

        // add new value to lists
        const updatedValues = [...values, value];
        const updatedDates = [...dates, currentDate];

        // Save updated values and dates to state and localStorage
        setValues(updatedValues);
        setDates(updatedDates);
        localStorage.setItem("sliderValues", JSON.stringify(updatedValues));
        localStorage.setItem("sliderDates", JSON.stringify(updatedDates));

        // Navigate to the next page
        navigate("/Layout");
    };

    return (
        <div>
            <h1>Pick a Mood</h1>

            <input
                type="range"
                min="1"
                max="10"
                value={value}
                onChange={handleChange}
                onMouseUp={handleRelease}     // Desktop
                onTouchEnd={handleRelease}    // Mobile
            />

            <div>
                Selected: {value} {emojis[value - 1]}
            </div>

            <div>
                <h3>history stored in local for now but to be changed in sprint 2:</h3>
                <ul>
                    {values.length === 0 ? (
                        <li>No data yet</li>
                    ) : (
                        values.map((val, index) => (
                            <li key={index}>#{index + 1}: {val} {emojis[val - 1]}</li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TakeMood;
