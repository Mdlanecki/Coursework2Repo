import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Legend, Label, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";
import './WebApp.css';

function GraphsPage() {
    const navigate = useNavigate();

    const options = ['Elevation',  'Max Heart Rate', 'Distance']
    const data = [
        { workoutNum: 1, heartRate: 200, elevation: 120, distance: 1025 },
        { workoutNum: 2, heartRate: 175, elevation: 55,  distance: 1500 },
        { workoutNum: 3, heartRate: 195, elevation: 175, distance: 1740 },
        { workoutNum: 4, heartRate: 150, elevation: 20,  distance: 975  },
        { workoutNum: 5, heartRate: 164, elevation: 60,  distance: 2000 }]

    const [checkedOptions, setCheckedOptions] = useState({});

    function handleCheck(event, option) {
        const { checked } = event.target;
        setCheckedOptions((prev) => ({
            ...prev,
            [option]: checked,
        }));
    }

    return (
        <div className="graphs">
            <h1 className='title'>Graph View</h1>

            <div className='graphPageLayout'>
                <div className='optionsPanel'>
                    <h3>Graph Options:</h3>
                    {options.map((option) => (
                        <label className='option' key={option}>
                            <input type='checkbox' checked={!!checkedOptions[option]} onChange={(event) => handleCheck(event, option)} />
                            {option}
                        </label>
                    ))}
                </div>

                <div className='graphDiv'>
                    <ResponsiveContainer width="100%" height={500} className='lineGraph'>
                        <LineChart data = {data}>
                            <XAxis dataKey='workoutNum'>
                                <Label value='Workout Number' offset={-5} position='insideBottom' dy={-5} />
                            </XAxis>
                            <YAxis yAxisId='left'>
                                <Label value='Heartrate (bpm), elevation (ft)' angle={-90} position='bottomLeft' dx={-20} />
                            </YAxis>
                            <YAxis yAxisId='right' orientation='right'>
                                <Label value='Distance (m)' angle={-90} position='bottomright' dx={20} />
                            </YAxis>
                            <Legend />
                            {checkedOptions['Max Heart Rate'] && <Line type='Monotone' dataKey='heartRate' stroke="#FF0000" strokeWidth={2} yAxisId='left' />}
                            {checkedOptions['Elevation'] && <Line type='Monotone' dataKey='elevation' stroke="#808080" strokeWidth={2} yAxisId='left' />}
                            {checkedOptions['Distance'] && <Line type='Monotone' dataKey='distance' stroke="#008000" strokeWidth={2} yAxisId='right' />}
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <button className='back' onClick={navigate('/MainWindow')}>Back</button>
            </div>
        </div>
    );
}

export default GraphsPage;
