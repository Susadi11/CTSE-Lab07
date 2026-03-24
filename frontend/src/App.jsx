import { useState } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Use the environment variable for the API URL, fallback to localhost
  const API_URL = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL || "http://localhost:3000";

  const loadWeather = async () => {
    setLoading(true);
    setError("");
    setWeatherData([]);

    try {
      const response = await fetch(`${API_URL}/api/weather`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError("Failed to connect to Gateway Service. Is it running?");
      console.error("API call failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return '☀️';
      case 'cloudy': return '☁️';
      case 'rainy': return '🌧️';
      default: return '🌤️';
    }
  };

  return (
    <div className="app">
      <div className="dashboard">
        <div className="header">
          <div className="badge">☁️ Azure</div>
          <h1>Weather Dashboard</h1>
          <p className="subtitle">
            Microservices Demo deployed on Azure Container Apps & Static Web Apps.
          </p>
          <button onClick={loadWeather} disabled={loading} className="btn-primary">
            {loading ? "Loading..." : "Load Weather Data"}
          </button>
        </div>

        {error && (
          <div className="alert error">
            <span className="icon">❌</span> {error}
          </div>
        )}

        {weatherData.length > 0 && (
          <div className="weather-grid">
            {weatherData.map((data, index) => (
              <div key={index} className="weather-card">
                <h2>{data.city}</h2>
                <div className="weather-info">
                  <span className="weather-icon">{getWeatherIcon(data.condition)}</span>
                  <div className="weather-details">
                    <span className="temp">{data.temp}°C</span>
                    <span className="condition">{data.condition}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
