import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";
import { MONTHS, DAYS, DEFAULT_CITY, WEATHER_API } from "../constants";

import "../styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

/**
 * Main App component
 * Handles weather search, API calls, and state management
 */
function App() {
  // State for search input
  const [query, setQuery] = useState("");
  
  // State for weather data with loading, error, and data properties
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false,
    errorType: "",
  });

  /**
   * Get API key from .env file
   * Returns undefined if key is not set
   */
  const getApiKey = () => process.env.REACT_APP_WEATHER_API_KEY?.trim();

  /**
   * Format today's date as "Day Date Month" (e.g., "Monday 8 May")
   */
  const toDate = () => {
    const currentDate = new Date();
    const date = `${DAYS[currentDate.getDay()]} ${currentDate.getDate()} ${
      MONTHS[currentDate.getMonth()]
    }`;
    return date;
  };

  /**
   * Search for weather by city name
   * Called when user clicks search button or presses Enter
   */
  const search = async (event) => {
    event.preventDefault();
    if (event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
      setWeather((prev) => ({ ...prev, loading: true, error: false, errorType: "" }));
      const apiKey = getApiKey();

      // Check if API key is configured
      if (!apiKey) {
        setWeather({
          data: {},
          loading: false,
          error: true,
          errorType: "missing-api-key",
        });
        return;
      }

      // Build API URL with query and key
      const url = `${WEATHER_API.CURRENT}?query=${query}&key=${apiKey}`;

      try {
        const res = await axios.get(url);
        setWeather({ data: res.data, loading: false, error: false, errorType: "" });
      } catch (error) {
        // Handle different error types
        const isUnauthorized = error?.response?.status === 401;
        setWeather({
          data: {},
          loading: false,
          error: true,
          errorType: isUnauthorized ? "invalid-api-key" : "city-not-found",
        });
        console.error("Error fetching weather data:", error);
      }
    }
  };

  /**
   * Load weather for default city on app startup
   */
  useEffect(() => {
    const fetchData = async () => {
      const apiKey = getApiKey();

      if (!apiKey) {
        setWeather({
          data: {},
          loading: false,
          error: true,
          errorType: "missing-api-key",
        });
        return;
      }

      // Build API URL for default city
      const url = `${WEATHER_API.CURRENT}?query=${DEFAULT_CITY}&key=${apiKey}`;

      try {
        const response = await axios.get(url);
        setWeather({ data: response.data, loading: false, error: false, errorType: "" });
      } catch (error) {
        const isUnauthorized = error?.response?.status === 401;
        setWeather({
          data: {},
          loading: false,
          error: true,
          errorType: isUnauthorized ? "invalid-api-key" : "city-not-found",
        });
        console.error("Error fetching initial weather data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {/* SearchEngine component */}
      <SearchEngine query={query} setQuery={setQuery} search={search} />

      {weather.loading && (
        <>
          <br />
          <br />
          <h4>Searching...</h4>
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span style={{ fontFamily: "font" }}>
              {weather.errorType === "missing-api-key" &&
                "Missing API key. Add REACT_APP_WEATHER_API_KEY to your .env file and restart the app."}
              {weather.errorType === "invalid-api-key" &&
                "Invalid API key. Update REACT_APP_WEATHER_API_KEY with a valid SheCodes key."}
              {weather.errorType === "city-not-found" &&
                "Sorry, city not found. Please try again."}
            </span>
          </span>
        </>
      )}

      {weather && weather.data && weather.data.condition && (
        // Forecast component
        <Forecast weather={weather} toDate={toDate} />
      )}
    </div>
  );
}

export default App;
