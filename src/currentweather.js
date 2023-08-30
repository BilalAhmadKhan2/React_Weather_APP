import React from 'react';

const currentweather = ({ currentWeather, dateToWords }) => {
    return (
        <div className="col-md-6">
            <div className="card rounded p-3 mb-3 cardeffects" style={{ width: '100%' }}>
                <div className="card-body cardeffects">
                    <div className="row">

                        <div className="col-md-12 text-center mb-3">
                            <h3 style={{ whiteSpace: 'nowrap', fontWeight: 'bold', fontSize: '1.7rem' }}>{currentWeather.location.name}</h3>
                        </div>

                        <div className="col-md-5 text-center d-flex align-items-center justify-content-center">
                            <div>
                                <img
                                    src={`http:${currentWeather.condition.icon}`}
                                    alt={currentWeather.condition.text}
                                    style={{ maxWidth: '80%', height: 'auto' }} 
                                />
                                <h2>
                                    <span className="temp-value">{currentWeather.temp_c.toFixed(2)}°C</span>
                                </h2>
                            </div>
                        </div>

                        <div className="col-md-7">
                            <div style={{ maxWidth: '100%' }}>
                                <p style={{ fontSize: '0.8rem' }}>{`${currentWeather.location.region}/${currentWeather.location.country}`}</p>
                                <p style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}>{dateToWords(currentWeather.location.localtime)}</p>
                                <p style={{ fontSize: '0.8rem' }}>{currentWeather.condition.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default currentweather;
