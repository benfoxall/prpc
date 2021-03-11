import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { ServerContext } from "../Host";
import { ClientContext } from "../Join";
import { PuckService } from "../lib/protos/generated/puck_pb_service";

let _waiting = false;
let wait = () => {
  if (_waiting) return false;

  setTimeout(() => (_waiting = false), 500);

  return (_waiting = true);
};

const Client: FunctionComponent = () => {
  const [a, setA] = useState("-");
  const [b, setB] = useState("-");

  const client = useContext(ClientContext);

  const setLED = (which: 0 | 1 | 2, on: boolean) => {
    if (!wait()) return;
    const calc = client.getService(PuckService);

    calc("setLED", (req) => {
      req.setColor(which);
      req.setOn(on);
    });
  };

  const isPressed = async () => {
    if (!wait()) return;
    const calc = client.getService(PuckService);

    setA("_");
    const res = await calc("isPressed");
    setA(res.getPressed() ? "YES" : "NO");
  };

  const weather = async () => {
    if (!wait()) return;
    const calc = client.getService(PuckService);

    setB("_");
    const res = await calc("getWeather");
    setB(`It's 🌡${res.getTemperature()}, and ${res.getLight().toFixed(3)} 💪`);
  };

  return (
    <div className="Puck">
      <div className="LEDs">
        <div className="red">
          <button onClick={() => setLED(0, true)}>on</button>
          <button onClick={() => setLED(0, false)}>off</button>
        </div>
        <div className="green">
          <button onClick={() => setLED(1, true)}>on</button>
          <button onClick={() => setLED(1, false)}>off</button>
        </div>
        <div className="blue">
          <button onClick={() => setLED(2, true)}>on</button>
          <button onClick={() => setLED(2, false)}>off</button>
        </div>
      </div>

      <section>
        <button onClick={isPressed}>is pressed?</button>
        <output>{a}</output>
      </section>

      <section>
        <button onClick={weather}>weather?</button>
        <output>{b}</output>
      </section>
    </div>
  );
};

const WindowPuck = (window as any).Puck;

const Server: FunctionComponent = () => {
  const server = useContext(ServerContext);

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
      `);
    }
  }, [connected]);

  useEffect(() => {
    if (!server) return;

    server.addService(PuckService, {
      setLED(req, res) {
        if (connected) {
          const N = req.getColor() + 1;
          const com = req.getOn() ? "set" : "reset";

          WindowPuck.write(`LED${N}.${com}()\n`);
        }
      },
      async isPressed(req, res) {
        const pressed: boolean = await WindowPuck.eval("BTN.read()");

        res.setPressed(pressed);
      },

      async getWeather(req, res) {
        const temp: number = await WindowPuck.eval("Puck.getTemperature()");
        const light: number = await WindowPuck.eval("Puck.light()");

        res.setLight(light);
        res.setTemperature(temp);
      },
    });

    return () => server.removeService(PuckService);
  }, [server, connected]);

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

export const Puck = { Server, Client };
