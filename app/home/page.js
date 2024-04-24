"use client"; // This directive indicates that we're using this file in a client-side environment.

import React, { useState, useEffect } from "react";
import { useUserAuth } from "../auth-context"; // Adjust the path as needed
import Link from "next/link";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const { user } = useUserAuth(); // Assume no need for firebaseSignOut directly here unless a logout feature on this page is desired

  // TODO: Implement fetchWeather function to fetch weather data using the OpenWeatherMap API.
  // Read the documentation of the API provider to understand how to handle the returned JSON object.
  async function fetchWeather() {
    const latitude = 51.0501;
    const longitude = -114.0853;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=51.0501&longitude=-114.0853&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max&timezone=auto`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  }

  // TODO: Implement loadWeather function that calls fetchWeather and sets the returned data into the weather state.

  function loadWeather() {
    fetchWeather().then(data => {
      setWeather(data);
    });
  }

  useEffect(() => {
    // TODO: Check if the user is logged in. If yes, call loadWeather to fetch weather data.
    if (user) {
      loadWeather();
    }
  }, [user]); // Dependency array ensures this effect runs when the user state changes.

  return (
    <main className="bg-gradient-to-br from-blue-200 to-indigo-600 min-h-screen p-4">
      <div className="max-w-xl mx-auto text-center bg-white rounded-xl shadow-lg p-5 mt-10">
        <h1 className="text-3xl font-bold text-gray-800">Weather in Calgary</h1>
        <h2 className="text-xl font-semibold text-gray-700 my-3">Daily Weather Forecast</h2>
        {user ? (
          <>
            {weather && (
              <div className="space-y-2 text-black">
                <p className="text-lg"><span className="font-bold">Max Temp:</span> {weather.daily.temperature_2m_max[0]}°C</p>
                <p className="text-lg"><span className="font-bold">Min Temp:</span> {weather.daily.temperature_2m_min[0]}°C</p>
                <p className="text-lg"><span className="font-bold">Sunrise:</span> {new Date(weather.daily.sunrise[0]).toLocaleTimeString()}</p>
                <p className="text-lg"><span className="font-bold">Sunset:</span> {new Date(weather.daily.sunset[0]).toLocaleTimeString()}</p>
                <p className="text-lg"><span className="font-bold">Max UV Index:</span> {weather.daily.uv_index_max[0]}</p>
                <p className="text-lg"><span className="font-bold">Total Precipitation:</span> {weather.daily.precipitation_sum[0]}mm</p>
                <p className="text-lg"><span className="font-bold">Max Precipitation Probability:</span> {weather.daily.precipitation_probability_max[0]}%</p>
              </div>
            )}

            <Link href="/">
              <button className="mt-4 inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out">
                Home
              </button>
            </Link>
            
          </>
        ) : (
          <>
            <p className="text-lg text-gray-800">Please log in to see the weather information.</p>
            <Link href="/">
              <button className="mt-4 inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out">
                Home
              </button>
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
