import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import { ServerContext } from "../Host";
import { ClientContext } from "../Join";
import { BubbleService } from "../lib/protos/generated/bubble_pb_service";
import { Bubble } from "../lib/protos/generated/bubble_pb";

const Client: FunctionComponent = () => {
  const [bubbles, setBubbles] = useState<Bubble.AsObject[]>([]);

  const client = useContext(ClientContext);
  const [stream, unary] = useMemo(
    () => [
      client.getServiceStream(BubbleService),
      client.getService(BubbleService),
    ],
    [client]
  );

  useEffect(() => {
    const load = async () => {
      let bubs = [] as Bubble.AsObject[];

      const list = await unary("GetAll");

      setBubbles(list.getBubblesList().map((b) => b.toObject()));

      for await (const bub of stream("Popped")) {
        setBubbles((prev) =>
          prev.filter((t) => t.row !== bub.getRow() || t.col !== bub.getCol())
        );
      }

      console.log("___FINISHED");
    };

    load();
  }, []);

  const click = async (bub: Bubble.AsObject) => {
    unary("Pop", (req) => {
      req.setRow(bub.row);
      req.setCol(bub.col);
    });
  };

  return (
    <div className="Bubbles" style={{ display: "grid" }}>
      {bubbles.map((bub) => {
        const { row, col } = bub;

        return (
          <button
            style={{ gridColumn: col + 1, gridRow: row + 1 }}
            key={row + "-" + col}
            onClick={() => click(bub)}
          >
            👇
          </button>
        );
      })}
    </div>
  );
};

const range = (length: number) => Array.from({ length }, (_, i) => i);

const Server: FunctionComponent = () => {
  const server = useContext(ServerContext);

  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    if (!server) return;

    let list: Bubble[] = [];

    const rows = 10;
    const cols = 10;

    // initial list of bubbles
    for (const row of range(rows)) {
      for (const col of range(cols)) {
        const bub = new Bubble();
        bub.setCol(col + 1);
        bub.setRow(row + 1);

        list.push(bub);
      }
    }
    setBubbles(list);

    const listeners = new Set<(bub: Bubble) => void>();

    async function* listen() {
      while (true) {
        let resolve: (bub: Bubble) => void;
        let promise = new Promise<Bubble>((res) => (resolve = res));
        listeners.add(resolve);

        // this may miss some, but meh
        const bub = await promise;
        yield bub;

        listeners.delete(resolve);
      }
    }

    let stop = false;

    server.addService(BubbleService, {
      GetAll(req, res) {
        res.setBubblesList(list);
      },

      Pop(req) {
        const { col, row } = req.toObject();
        const found = list.find(
          (b) => b.getCol() === col && b.getRow() === row
        );
        if (found) {
          list = list.filter((t) => t !== found);

          // pop
          setBubbles(list);

          // notify any listeners
          listeners.forEach((fn) => fn(found));
        }
      },

      async *Popped() {
        for await (const pop of listen()) {
          if (stop) {
            break;
          }

          yield pop;
        }
      },
    });

    return () => {
      stop = true;
      server.removeService(BubbleService);
    };
  }, [server]);

  return (
    <div className="Bubbles" style={{ display: "grid" }}>
      {bubbles.map((bubble) => {
        const { row, col } = bubble.toObject();

        return (
          <div key={row + " " + col} style={{ gridRow: row, gridColumn: col }}>
            🎾
          </div>
        );
      })}
    </div>
  );
};

export const Bubbles = { Server, Client };
