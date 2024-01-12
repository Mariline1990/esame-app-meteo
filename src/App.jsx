import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
    } catch (error) {
      console.error("Errore nel recupero dei dati meteo", error);
      setWeatherData(null);
    }
  };

  const getWeatherData = async (city) => {
    const apiKey = "24ce9f0b87c90e7b7e9838a50ce1b048";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      return {
        temperature: data.main.temp,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      };
    }
  };

  console.log(weatherData);
  return (
    <Container className="mt-5">
      <Row
        className="justify-content-center bg-info rounded-2 py-3"
        style={{
          background: "rgb(240,240,240)",
          background: "radial-gradient(circle, rgba(240,240,240,1) 0%, rgba(122,198,237,1) 100%)",
        }}
      >
        <Col md={6}>
          <h1 style={{ paddingLeft: "150px", color: "#08a4f4", marginTop: "40px" }}>
            {" "}
            <span className="text-dark fs-2">the</span> Weather
          </h1>
          <h2 style={{ marginTop: "-25px" }} className="text-center">
            in my city
          </h2>

          {/* form */}
          <form
            onSubmit={submit}
            style={{ paddingTop: "50px" }}
            className=" d-flex justify-content-center align-items-center"
          >
            <div className="form-group  " style={{ marginBot: "-50px" }}>
              <label htmlFor="cityInput">Inserisci il nome della città:</label>
              <input
                type="text"
                className="form-control"
                id="cityInput"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-block mt-4 mx-2"
              style={{ background: "white", textAlign: "center" }}
            >
              Cerca
            </button>
          </form>
          <div className="mt-4 text-center">
            {weatherData && (
              <div className="border border-2 rounded-4" style={{ textAlign: "center" }}>
                <img
                  style={{}}
                  src={`http://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
                  alt="Weather Icon"
                />

                <p>
                  Temperatura:
                  <b> {weatherData.temperature}°C</b>
                </p>
                <p>
                  Pressione:
                  <b> {weatherData.pressure} hPa</b>
                </p>
                <p>
                  Umidità:
                  <b> {weatherData.humidity}%</b>
                </p>
                <p>
                  Velocità del vento:
                  <b> {weatherData.windSpeed} m/s</b>
                </p>
                <p>
                  Descrizione:
                  <b> {weatherData.description}</b>
                </p>
              </div>
            )}
            {weatherData === null && <p>Errore nel recupero dei dati meteo</p>}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
