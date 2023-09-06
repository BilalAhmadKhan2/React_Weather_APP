import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY, API_URL } from './constants';
import Currentweather from './currentweather';
import WeatherData from './WeatherData';
import Forecast from './Forecast';
import TempChart from './TempChart';

const App = () => {
  const [query, setQuery] = useState('leeds');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const [isDaytime, setIsDaytime] = useState(true);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dateToWords = (localtime) => {
    const [date, time] = localtime.split(' ');
    const [year, month, dateNum] = date.split('-');
    return `${months[parseInt(month, 10) - 1]} ${dateNum}, ${year} ${time}`;
  };

 
  useEffect(() => {
    search();
    // eslint-disable-next-line
  }, []);

  const search = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}?key=${API_KEY}&q=${query}&days=3&aqi=yes&alerts=no`);
      const { current, location, forecast } = data;
      if (!current || !location) throw new Error('Location or weather data not found');
      
      setCurrentWeather({ ...current, location });
      setIsDaytime(current.is_day === 1);
      setForecastData(forecast?.forecastday || []);
      setErrorMessage(null);
    } catch (error) {
      console.log('Error:', error);
      setCurrentWeather(null);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const nineTemps = forecastData[0]?.hour.map(hour => hour.temp_c)?.filter((_, i) => i % 3 === 0) || [];
  nineTemps.push(forecastData[0]?.hour.slice(-1)[0]?.temp_c || null);

  return (
    <div className="App container-fluid">
      <header className="mb-3 py-3">
        <div className="container "> 
          <div className="row justify-content-center"> 
            <div className="col-lg-6 col-md-8">
              <div className="input-group input-group-sm mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search city..."
                  aria-label="City name"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={search}
                  style={{ border: 'none' }}
                >
                  <img src="https://cdn-icons-png.flaticon.com/512/954/954591.png" alt="Search Icon" style={{ height: '20px', width: '20px' }} />
                </button>

              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              {loading && <p className='text-center mt-3'>Loading...</p>}
              {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}
            </div>
          </div>
        </div>

      </header>
    {currentWeather && (
    <div className="row mt-3">
      <div className="col-lg-6 col-md-12 p-1">
        <div className="card rounded p-1 mb-2" style={{ backgroundColor: 'transparent' }}>
          <div className="card-body">
            <div className="row mb-4">
              <Currentweather currentWeather={currentWeather} dateToWords={dateToWords} />
              <WeatherData weatherData={currentWeather} /> 
            </div>
            <div className="row">
              <div className="col">
                <div className="card rounded p-3 cardeffects">
                  <div className="card-body cardeffects">
                    {forecastData.length > 0 && (
                      <div className="col-12 p-3">
                        <h2>Forecast</h2>
                        <Forecast forecastData={forecastData} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-12 p-1">
        <div className="row">
          <div className="col-12 mb-2">
            <TempChart tempsData={nineTemps} width={200} height={50} />
          </div>
          <div className="col-12">
            <img
              src={isDaytime ? "https://images.wallpaperscraft.com/image/single/clouds_sky_day_172438_1280x720.jpg" : "https://images.hdqwalls.com/download/mountains-night-sky-1280x720.jpg"}
              alt={isDaytime ? "Daytime Landscape" : "Nighttime Landscape"}
              style={{ width: '100%', height: 'auto', borderRadius: '20px' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

      <footer className="mt-3 pt-3 text-center">
        <p style={{ color: '#FFFFFF' }}>
          © 2023 Weather App. All rights reserved. Designed and built by Bilal Ahmad Khan with React, Bootstrap, CSS, Chart.js, and WeatherAPI.
        </p>

      </footer>
    </div>
  );
}

export default App;
