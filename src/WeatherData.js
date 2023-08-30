import React from 'react';
const WeatherData = ({ weatherData }) => {
  const pressureIcon = 'https://icons.veryicon.com/png/o/miscellaneous/intelligent-agriculture/pressure-1.png';
  const humidityIcon = 'https://cdn-icons-png.flaticon.com/512/727/727790.png';
  const windspeedIcon = 'https://icon-library.com/images/wind-speed-icon/wind-speed-icon-6.jpg';
  const uvindexIcon = 'https://cdn-icons-png.flaticon.com/512/3262/3262975.png';
  const winddirIcon = 'https://cdn-icons-png.flaticon.com/512/2830/2830040.png';
  const airqualityIcon = 'https://cdn-icons-png.flaticon.com/512/5024/5024476.png';
  const feelslikeIcon = 'https://static-00.iconduck.com/assets.00/temperature-feels-like-icon-495x512-ylzv705f.png';
  const visibilityIcon = 'https://cdn-icons-png.flaticon.com/512/3395/3395544.png';

  const iconStyle = { width: '38px', height: '38px' };

  return (
    <div className="col-md-6">
      <div className="row">
        <div className="col-6 mb-3">
          <div className="card rounded p-3 cardeffects">
            <div className="card-body cardeffects">
              {renderData(pressureIcon, "Pressure", `${weatherData.pressure_mb}mb`)}
              {renderData(humidityIcon, "Humidity", `${weatherData.humidity}%`)}
              {renderData(windspeedIcon, "Wind Speed", `${weatherData.wind_kph}kph`)}
              {renderData(uvindexIcon, "UV Index", weatherData.uv)}
            </div>
          </div>
        </div>
        <div className="col-6 mb-3">
          <div className="card rounded p-3 cardeffects">
            <div className="card-body cardeffects">
              {renderData(winddirIcon, "Wind Direction", weatherData.wind_dir)}
              {renderData(airqualityIcon, "AQI", weatherData.air_quality['gb-defra-index'])}
              {renderData(feelslikeIcon, "Feels Like", `${weatherData.feelslike_c.toFixed(2)}°C`)}
              {renderData(visibilityIcon, "Visibility", `${weatherData.vis_km}km`)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function renderData(iconSrc, altText, value) {
    return (
      <div className="d-flex align-items-center justify-content-start mb-2">
        <div className="icon-container">
          <img src={iconSrc} alt={altText} style={iconStyle} />
        </div>
        <div className="value-container ml-2">
          <p>{value}</p>
        </div>
      </div>
    );
  }
};

export default WeatherData;
