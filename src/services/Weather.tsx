import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { ServerContext } from "../Host";
import { ClientContext } from "../Join";
import { WeatherResponse } from "../lib/protos/generated/weather_pb";
import { WeatherService } from "../lib/protos/generated/weather_pb_service";

const Client: FunctionComponent = () => {
  const client = useContext(ClientContext);
  const [weather, setWeather] = useState<WeatherResponse>();

  const check = async () => {
    const calc = client.getService(WeatherService);

    setWeather(await calc("query"));
  };

  return (
    <section className="Weather client">
      <button onClick={check}>Check the weather</button>

      {weather && (
        <>
          <h2>Where? {weather.getPlacename()}</h2>
          <h2>
            💨 {Math.round(weather.getWindSpeed())}{" "}
            <div
              style={{
                transform: `rotate(${weather.getWindDirection()}deg)`,
                display: "inline-block",
              }}
            >
              ⬆️
            </div>
          </h2>
          <h2>Cloudy? {weather.getCloudy() ? "☁️ yep" : "🌞 no!"}</h2>
          <h2>🌡 {weather.getTemprature().toFixed(2)}!!</h2>

          {/* <p>
            {weather.getPhoto() && (
              <img
                src={new TextDecoder().decode(weather.getPhoto_asU8())}
                style={{ maxHeight: "5em", maxWidth: "5em" }}
              />
            )}
          </p> */}
        </>
      )}
    </section>
  );
};

const Server: FunctionComponent = () => {
  const server = useContext(ServerContext);
  const [operation, setOperation] = useState("+");

  const [name, setName] = useState("");
  const handleName = (e) => {
    setName(e.target.value);
  };

  const [cloudy, setCloudy] = useState<boolean>(false);
  const handleCloudy = (e) => {
    setCloudy(e.target.checked);
  };

  const [temperature, setTemperature] = useState<number>(10);
  const handleTemperature = (e) => {
    setTemperature(e.target.valueAsNumber);
  };

  const [windspeed, setWindspeed] = useState<number>(0);
  const handleWindspeed = (e) => {
    setWindspeed(e.target.valueAsNumber);
  };

  const [windDirection, setWindDirection] = useState<number>(0);
  const handleWindDirection = (e) => {
    setWindDirection(e.target.valueAsNumber);
  };

  useEffect(() => {
    if (!server) return;

    server.addService(WeatherService, {
      query: (req, res) => {
        res.setPlacename(name);
        res.setCloudy(cloudy);
        res.setTemprature(temperature);
        res.setWindSpeed(windspeed);
        res.setWindDirection(windDirection);
      },
    });

    return () => server.removeService(WeatherService);
  }, [name, cloudy, temperature, windDirection, windspeed]);

  return (
    <section className="Weather server">
      <label>
        <span>Placename</span>
        <input type="text" onChange={handleName} autoComplete="none" />
      </label>
      <label>
        <span>Cloudy?</span>
        <input type="checkbox" onChange={handleCloudy} />
      </label>

      <label>
        <span>Temperature</span>
        <input
          type="range"
          onChange={handleTemperature}
          value={temperature}
          min="-10"
          max="40"
          step="0.1"
        />{" "}
        {temperature}
      </label>

      <label>
        <span>Wind Speed</span>
        <input
          type="range"
          onChange={handleWindspeed}
          value={windspeed}
          min="0"
          max="100"
          step="0.1"
        />{" "}
        {windspeed}
      </label>

      <label>
        <span>Wind Direction</span>
        <input
          type="range"
          onChange={handleWindDirection}
          value={windDirection}
          min="0"
          max="100"
          step="0.1"
        />{" "}
        {windDirection}
      </label>
    </section>
  );
};

export const Weather = { Server, Client };
