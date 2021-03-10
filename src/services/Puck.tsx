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
      <div className="LEDs">
        <div className="red">
          <button>on</button>
          <button>off</button>
        </div>
        <div className="green">
          <button>on</button>
          <button>off</button>
        </div>
        <div className="blue">
          <button>on</button>
          <button>off</button>
        </div>
      </div>

      <section>
        <button>is pressed?</button>
        <output>-</output>
      </section>

      <section>
        <button>weather?</button>
        <output>-</output>
      </section>
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
      <button className="connect">Connect</button>

      <p>
        <a href="https://www.puck-js.com/" target="_blank">
          puck-js.com
        </a>
      </p>
    </div>
  );
};

export const Puck = { Server, Client };
