import React from 'react';

const Forecast = ({ forecastData }) => {

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };

  return (
    <div className="forecast-list">
      <ul>
        {forecastData.map((day, index) => (
          <li key={index}>
            <span>{getDayName(day.date)}</span>
            <img src={`http:${day.day.condition.icon}`} alt={day.day.condition.text} />
            <span>H {day.day.maxtemp_c.toFixed(2)}°C</span>
            <span>L {day.day.mintemp_c.toFixed(2)}°C</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forecast;
