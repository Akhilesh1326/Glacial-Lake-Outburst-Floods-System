// import React from 'react'
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Chart from 'chart.js/auto';

import { useState, useEffect } from 'react';


const TempHumidity = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [place, setPlace] = useState("")
    const [error, setError] = useState(null);

    const handleWeatherData = async () => {
        try {
            console.log(place)
            const resp = await axios.get(`/api/weatherData/${place}`);
            setWeatherData(resp.data);
            setError(null); // Clear any previous errors
        } catch (err) {
            console.log("Error fetching weather data: ", err);
            setError("Failed to fetch weather data. Please try again later.");
        }
    };
    const chartData = {
        labels: ['Temperature (°C)', 'Humidity (%)'],
        datasets: [
            {
                label: 'Current Weather',
                data: [
                    weatherData?.current.temp_c || 0,
                    weatherData?.current.humidity || 0
                ],
                backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1,
            },
        ],
    };
    useEffect(() => {
        // Clean up chart instance if needed
        return () => {
            Chart.getChart("chart")?.destroy();
        };
    }, [weatherData]);

    return (
        <div> 
            <input className='border-2 border-black py-2 px-4 m-4 bg-slate-400 rounded-md' type="text" value={place} onChange={(e)=>setPlace(e.target.value)}/>

            <button className='border py-2 px-4 border-black rounded-lg bg-slate-900 text-slate-200' onClick={handleWeatherData}>Submit</button>
            {error && <p>{error}</p>}
            {weatherData && (
                <div>
                    <h3>Weather Conditions:</h3>
                    <p>Temperature: {weatherData.current.temp_c}°C</p>
                    <p>Condition: {weatherData.current.condition.text}</p>
                    <Bar data={chartData} />
                </div>
            )}
        </div>
    )
}

export default TempHumidity
