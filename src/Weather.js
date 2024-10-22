// src/Weather.js

import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css'; // Optional: Create a CSS file for styling

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_KEY = '92382109c1ac4a20913210029240302'; // Your API key

    const fetchWeatherData = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
            setWeatherData(response.data);
        } catch (err) {
            setError('Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (city) {
            fetchWeatherData();
        }
    };

    return (
        <div className="weather-container">
            <input 
                type="text" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                placeholder="Enter city name" 
            />
            <button onClick={handleSearch}>Search</button>
            {loading && <p>Loading data…</p>}
            {error && <p>{error}</p>}
            {weatherData && (
                <div className="weather-cards">
                    <div className="weather-card">
                        <strong>Temperature</strong> <br></br><p>{weatherData.current.temp_c} °C</p>
                    </div>
                    <div className="weather-card">
                        <strong>Humidity</strong> <br></br><p>{weatherData.current.humidity} %</p>
                    </div>
                    <div className="weather-card">
                        <strong>Condition</strong> <br></br><p>{weatherData.current.condition.text}</p>
                    </div>
                    <div className="weather-card">
                        <strong>Wind Speed</strong> <br></br><p>{weatherData.current.wind_kph} kph</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
    //const API_KEY = '92382109c1ac4a20913210029240302';
