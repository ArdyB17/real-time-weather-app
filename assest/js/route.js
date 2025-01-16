/**
 * WeatherIO Router Module
 * ======================
 * Handles client-side routing and location-based weather data loading.
 * Coordinates between URL changes and weather data updates.
 * 
 * Dependencies:
 * - app.js: Provides updateWeather and error404 functions
 * - api.js: Location data is used to fetch weather information
 */

"use strict";

import {updateWeather , error404} from "./app.js"

/**
 * Default coordinates for initial load
 * Used when no specific location is requested
 * @constant {Object}
 */
const defaultLocation = {
    // ...existing code...
};

const approximatelocation = async () => {
    try {
        let ipResponse = await fetch("https://api.ipify.org/?format=json");
        let ipData = await ipResponse.json();
        let ip = ipData.ip;
        let locationResponse = await fetch(`https://ipinfo.io/${ip}?token=c177813f87d9fa`);
        let locationData = await locationResponse.json();
        const[latitude, longitude] = locationData.loc.split(",");
        updateWeather(`lat=${latitude}`,`lon=${longitude}`)
        window.location.hash=`#/approximatelocation`;
    } catch (error) {
        console.error("Error fetching location data:", error);
    }
};
const currentLoction = ()=>{
    window.navigator.geolocation.getCurrentPosition(res=>{
        const{latitude,longitude}=res.coords;
        updateWeather(`lat=${latitude}`,`lon=${longitude}`)
    },err=>{
        window.location.hash = "#/approximatelocation";
    })
}
const searchedLoction = query=>updateWeather(...query.split("&"));
const routes = new Map([
    ["/current-location",currentLoction],
    ["/weather",searchedLoction],
    ["/approximatelocation",approximatelocation]
]);

/**
 * Route initialization and handler setup
 * - Manages URL hash changes
 * - Coordinates with geolocation API
 * - Updates weather display based on location
 */
const initRoutes = () => {
    const checkHash = ()=>{
        const requestURL = window.location.hash.slice(1);
        const [route , query] = requestURL.includes ? requestURL.split("?") : [requestURL];
        routes.get(route) ? routes.get(route)(query) : error404();
    }
    window.addEventListener("hashchange",checkHash)
    window.addEventListener("load",()=>{
        if(!window.location.hash)
            window.location.hash="#/current-location";
        else
            checkHash();
    })
};

initRoutes();