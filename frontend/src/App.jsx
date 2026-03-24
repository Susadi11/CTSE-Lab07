import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Use the environment variable for the API URL, fallback to localhost
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const callApi = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/message`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      setError("Failed to connect to Gateway Service. Is it running?");
      console.error("API call failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="card">
        <div className="badge">☁️ Azure</div>
        <h1>Azure Microservices Demo</h1>
        <p className="subtitle">
          A simple full-stack demo with a React frontend and Node.js gateway
          service, deployed on Azure Container Apps &amp; Static Web Apps.
        </p>

        <button onClick={callApi} disabled={loading} className="call-btn">
          {loading ? "Calling API..." : "Call API"}
        </button>

        {message && (
          <div className="response success">
            <span className="response-label">✅ Response:</span>
            <span className="response-text">{message}</span>
          </div>
        )}

        {error && (
          <div className="response error">
            <span className="response-label">❌ Error:</span>
            <span className="response-text">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
