/**
 * WeatherIO API Integration Module
 * ===============================
 * This module handles all OpenWeatherMap API interactions for the WeatherIO application.
 * It provides endpoints for weather data, forecasts, air pollution, and geolocation.
 *
 * Related Files:
 * - app.js: Uses these API endpoints to fetch and display weather data
 * - route.js: Handles routing based on location data from API
 * - index.html: Displays the fetched weather information
 */

"use strict";

/**
 * OpenWeatherMap API Key
 * Required for all API requests to OpenWeatherMap services
 */
const apiKey = "9bcf58dad7e7d9164b9c38fa88bf867c";

/**
 * Generic data fetcher for OpenWeatherMap APIs
 * @function fetchData
 * @param {string} URL - The complete API endpoint URL
 * @param {Function} callback - Function to handle the API response
 *
 * Used by:
 * - Current weather display
 * - Forecast sections
 * - Air quality indicators
 * - Location search functionality
 */
export const fetchData = (URL, callback) => {
  fetch(`${URL}&appid=${apiKey}`)
    .then((res) => res.json())
    .then((data) => callback(data));
};

/**
 * API URL Generator Object
 * Contains methods to generate URLs for different OpenWeatherMap endpoints
 * @namespace
 */
export const url = {
  /**
   * Generates URL for current weather data
   * Used in the main weather card display (index.html)
   * @param {string} lat - Latitude coordinate
   * @param {string} lon - Longitude coordinate
   * @returns {string} Formatted API URL
   */
  currentWeather(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`;
  },

  /**
   * Generates URL for 5-day forecast data
   * Used in the forecast section of the dashboard
   *
   */
  forecast(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`;
  },

  /**
   * Generates URL for air pollution data
   * Used in the air quality card in highlights section
   *
   */
  airPollution(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`;
  },

  /**
   * Generates URL for reverse geocoding
   * Used when getting location name from coordinates
   * (e.g., when using "Current Location" feature)
   *
   */
  reverseGeo(lat, lon) {
    return `https://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`;
  },

  /**
   * Generates URL for geocoding (location search)
   * Used in the search functionality (search-view in index.html)
   * @param {string} query - Search query (e.g., "London", "New York")
   *
   */
  geo(query) {
    return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`;
  },
};

/**
 * Usage Examples:
 *
 * 1. Current Weather:
 * fetchData(url.currentWeather("lat=51.5074", "lon=-0.1278"), (data) => {
 *   // Updates current-weather section in index.html
 * });
 *
 * 2. Search Location:
 * fetchData(url.geo("London"), (data) => {
 *   // Updates search-result section in index.html
 * });
 *
 * Error Handling Note:
 * Errors are handled by the error-content section in index.html
 * which is toggled when API requests fail
 */
