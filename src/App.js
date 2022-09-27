import axios from "axios";
import { useState, useEffect } from "react";
import "./styles.css";

const api = {
  key: "f923f335aebef0505f0f83a7fab673e0",
  base: "https://api.openweathermap.org/data/2.5/"
};

const App = () => {
  const cities = [
    "Select a city",
    "Istanbul",
    "California",
    "Sonsonate",
    "Bishkek",
    "Vancouver",
    "London",
    "New York",
    "Tokyo"
  ];

  const [selectedCity, setSelectedCity] = useState(cities[1]);
  const [weather, setWeather] = useState({});

  const callToAPI = async () => {
    try {
      const res = await axios.get(
        `${api.base}weather?q=${selectedCity}&units=metric&APPID=${api.key}`
      );
      setWeather(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    callToAPI();
  }, [selectedCity]);

  const getSituation = () => {
    let situation = "";
    weather.weather?.forEach((element) => {
      situation = element.main;
    });
    return situation;
  };

  const handleChange = (e) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
  };
  return (
    <div className="container">
      <div className=" app">
        <main>
          <div className="top">
            <div className="location">
              {weather.name}/{weather.sys?.country}
            </div>
            <div>
              <div className="temp">
                <h2>{Math.round(weather.main?.temp)}°</h2>
              </div>
              <div>
                <div className="situation">
                  <h3>{getSituation()}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="select-area">
            <select
              className="custom-select"
              value={selectedCity}
              onChange={handleChange}
            >
              {cities.map((city, index) => {
                return (
                  <option
                    disabled={city === "Select a city" ? "disabled" : null}
                    key={index}
                    className="select-option"
                  >
                    {city}
                  </option>
                );
              })}
            </select>
            <br />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
