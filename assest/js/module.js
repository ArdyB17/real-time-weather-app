/**
 * WeatherIO Utility Module
 * =======================
 * Provides core utility functions and data used throughout the application.
 * This module supports app.js and is essential for date/time formatting 
 * and weather data calculations.
 * 
 * Related Files:
 * - app.js: Uses these utilities to format weather data for display
 * - api.js: Data returned from API calls is processed using these utilities
 */

"use strict";

/**
 * Day names used for formatting dates across the application
 * Used in the current weather card and 5-day forecast
 * @constant {Array<string>}
 */
export const weekDayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/**
 * Month abbreviations for date formatting
 * Used in weather cards and forecast displays
 * @constant {Array<string>}
 */
export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Formats Unix timestamp to human-readable date
 * Used in current weather display (app.js)
 * @param {number} dateUnix - Unix timestamp
 * @param {number} timezone - Timezone offset in seconds
 * @returns {string} Formatted date (e.g., "Monday 15 Jan")
 */
export const getDate = (dateUnix, timezone) => {
  const date = new Date((dateUnix + timezone) * 1000);
  const weekDayName = weekDayNames[date.getUTCDay()];
  const monthName = monthNames[date.getUTCMonth()];

  return `${weekDayName} ${date.getUTCDate()} ${monthName}`;
};

/**
 * Formats Unix timestamp to 12-hour time format
 * Used in hourly forecast and sunrise/sunset times
 * @param {number} timeUnix - Unix timestamp
 * @param {number} timezone - Timezone offset in seconds
 * @returns {string} Formatted time (e.g., "2:30 PM")
 */
export const getTime = (timeUnix, timezone) => {
  const date = new Date((timeUnix + timezone) * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
};
export const getHours = (timeUnix, timezone) => {
  const date = new Date((timeUnix + timezone) * 1000);
  const hours = date.getUTCHours();
  const period = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12} ${period}`;
};

/**
 * Converts meters per second to kilometers per hour
 * Used for wind speed display in weather cards
 * @param {number} mps - Speed in meters per second
 * @returns {number} Speed in kilometers per hour
 */
export const mps_to_kmh = (mps) => {
  const mph = mps * 3600;
  return mph / 1000;
};

/**
 * Air Quality Index (AQI) descriptions and health implications
 * Used in the air quality highlight card (app.js)
 * @constant {Object}
 */
export const aqiText = {
  1: {
    level: "Good",
    message:
      "Air quality is considered satisfactory, and air pollution poses little or no risk",
  },
  2: {
    level: "Fair",
    message:
      "Air quality is acceptable; however, for some pollutants, there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution",
  },
  3: {
    level: "Moderate",
    message:
      "Members of sensitive groups may experience health affect. the general public is not likely to be affected.",
  },
  4: {
    level: "Poor",
    message:
      "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.",
  },
  5: {
    level: "Very Poor",
    message:
      "Health warnings of emergency conditions. the entire population is more likely to be affected.",
  },
};
