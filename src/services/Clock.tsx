import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { ServerContext } from "../Host";
import { ClientContext } from "../Join";
import { ClockService } from "../lib/protos/generated/clock_pb_service";

const Client: FunctionComponent = () => {
  const [display, setValue] = useState(-1);

  const client = useContext(ClientContext);

  useEffect(() => {
    const service = client.getServiceStream(ClockService);

    let stop = false;

    (async () => {
      for await (const value of service("Listen")) {
        if (stop) {
          break;
        }

        setValue(() => value.getCount());
      }
    })();

    return () => {
      stop = true;
    };
  }, []);

  return (
    <div>
      <h1>CLOCK: {display}</h1>
    </div>
  );
};

const Server: FunctionComponent = () => {
  const [value, setValue] = useState(0);

  const server = useContext(ServerContext);

  useEffect(() => {
    if (!server) return;

    let stop = false;

    server.addService(ClockService, {
      async *Listen(req, res) {
        let i = 0;
        while (i++ < 50) {
          await new Promise((res) => setTimeout(res, 50));

          if (stop) return;

          i++;
          res.setCount(i);

          // keep ui in sync
          setValue(i);

          yield res;
        }
      },
    });

    return () => {
      stop = true;
      server.removeService(ClockService);
    };
  }, [server]);

  return <div>{value}</div>;
};

export const Clock = { Server, Client };
