import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ServerContext } from "../Host";
import { ClientContext } from "../Join";
import { PuckWeather } from "../lib/protos/generated/puck_pb";
import { PuckService } from "../lib/protos/generated/puck_pb_service";

let _waiting = false;
let wait = () => {
  if (_waiting) return false;

  setTimeout(() => (_waiting = false), 500);

  return (_waiting = true);
};

const Client: FunctionComponent = () => {
  const [weather, setWeather] = useState<PuckWeather>();

  const client = useContext(ClientContext);

  useEffect(() => {
    let stop = false;

    const run = async () => {
      const service = client.getServiceStream(PuckService);

      for await (const message of service("streamWeather")) {
        if (stop) break;

        setWeather(message);
      }
    };
    run();

    return () => (stop = true);
  }, []);

  return (
    <div className="Puck">
      {weather && (
        <h1 className="weather">
          It's 🌡${weather.getTemperature()}, and $
          {weather.getLight().toFixed(3)} 💪
        </h1>
      )}
    </div>
  );
};

const WindowPuck = (window as any).Puck;

const delay = (ti: number) => new Promise((res) => setTimeout(res, ti));

const Server: FunctionComponent = () => {
  const server = useContext(ServerContext);

  const [weather] = useState(() => new PuckWeather());

  const [battery, setBattery] = useState(0);
  const [connected, setConnected] = useState(false);
  const toggle = () => setConnected((prev) => !prev);

  useEffect(() => {
    if (connected) {
      WindowPuck.write("reset()\n");

      WindowPuck.eval("Puck.getBatteryPercentage()").then(setBattery);

      WindowPuck.write(`
          LED1.set();
          setTimeout(() => LED1.reset(), 500);
      \n`);

      let cancel = false;
      (async () => {
        await delay(1000);

        console.log("STARTI");

        while (!cancel) {
          weather.setLight(await WindowPuck.eval("Puck.light()"));

          await delay(100);

          weather.setTemperature(
            await WindowPuck.eval("Puck.getTemperature()")
          );

          await delay(400);
        }
        console.log("DONE");
      })();

      return () => (cancel = true);
    }
  }, [connected]);

  useEffect(() => {
    if (!server) return;

    server.addService(PuckService, {
      async *streamWeather() {
        while (true) {
          await new Promise((res) => setTimeout(res, 500));

          if (connected) {
            yield weather;
            console.log("yielded", weather.toObject());
          }
        }
      },
    });

    return () => server.removeService(PuckService);
  }, []);

  return (
    <div className="Puck">
      <button className="connect" onClick={toggle}>
        {connected ? "Disconnect" : "Connect"}
      </button>

      <p>
        <a href="https://www.puck-js.com/" target="_blank">
          puck-js.com
        </a>
      </p>

      <h1>{connected && <>⚡️ {battery + "%"}</>}</h1>
    </div>
  );
};

export const PuckStream = { Server, Client };
