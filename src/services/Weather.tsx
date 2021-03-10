import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { ServerContext } from "../Host";
import { ClientContext } from "../Join";
import { WeatherService } from "../lib/protos/generated/weather_pb_service";

const Client: FunctionComponent = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const [result, setResult] = useState<string | number>("?");

  const client = useContext(ClientContext);

  //   const calculate = () => {
  //     const calc = client.getService(WeatherService);

  //     calc("Calculate", (req) => {
  //       req.setValue1(a);
  //       req.setValue2(b);
  //     }).then((res) => {
  //       setResult(res.getValue());
  //     });
  //   };

  return (
    <div className="Weather">
      <button>What's the weather like?</button>
      <h1>It's 23 degrees, and NOT cloudy!</h1>
    </div>
  );
};

const Server: FunctionComponent = () => {
  const server = useContext(ServerContext);
  const [operation, setOperation] = useState("+");

  //   useEffect(() => {
  //     if (!server) return;

  //     server.addService(WeatherService, {
  //       Calculate: (req, res) => {
  //         res.setValue(compute(req.getValue1(), operation, req.getValue2()));
  //       },
  //     });

  //     return () => server.removeService(WeatherService);
  //   }, [server, operation]);

  return (
    <div className="Weather">
      <input type="range"></input>
    </div>
  );
};

export const Weather = { Server, Client };
