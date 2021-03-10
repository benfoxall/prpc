import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { ServerContext } from "../Host";
import { ClientContext } from "../Join";
import { PuckService } from "../lib/protos/generated/puck_pb_service";

const Client: FunctionComponent = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const [result, setResult] = useState<string | number>("?");

  const client = useContext(ClientContext);

  //   const calculate = () => {
  //     const calc = client.getService(PuckService);

  //     calc("Calculate", (req) => {
  //       req.setValue1(a);
  //       req.setValue2(b);
  //     }).then((res) => {
  //       setResult(res.getValue());
  //     });
  //   };

  return (
    <div className="Puck">
      <button>What's the Puck like?</button>
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
    <div className="Puck">
      <input type="range"></input>
    </div>
  );
};

export const Puck = { Server, Client };
