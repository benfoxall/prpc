import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { ServerContext } from "../Host";
import { ClientContext } from "../Join";
import { BubbleService } from "../lib/protos/generated/bubblewrap_pb_service";
import { Bubble } from "../lib/protos/generated/bubblewrap_pb";

const Client: FunctionComponent = () => {
  const [bubbles, setBubbles] = useState<Bubble.AsObject[]>([]);

  const client = useContext(ClientContext);

  useEffect(() => {
    const service = client.getService(BubbleService);

    service("State", () => {}).then((res) => {
      res.getBubblesList();

      console.log(res.toObject());
      setBubbles(res.toObject().bubblesList);
    });
  }, []);

  const press = (bub: Bubble.AsObject) => {
    const service = client.getService(BubbleService);

    service("Press", (req) => {
      req.setCol(bub.col);
      req.setRow(bub.row);
    });
  };

  return (
    <div className="BubbleWrap" style={{ display: "grid" }}>
      {bubbles.map((bub) => {
        const { row, col } = bub;

        return (
          <button
            style={{ gridColumn: col + 1, gridRow: row + 1 }}
            key={row + "-" + col}
            onClick={() => press(bub)}
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

  const rows = 10;
  const cols = 10;
  const [bubbles, setBubbles] = useState(() => {
    const list = [] as Bubble.AsObject[];

    for (const row of range(rows)) {
      for (const col of range(cols)) {
        list.push({
          row,
          col,
          popped: false,
        });
      }
    }

    return list;
  });

  useEffect(() => {
    if (!server) return;

    server.addService(BubbleService, {
      State: (req, res) => {
        for (const bub of bubbles) {
          const b = new Bubble();
          b.setCol(bub.col);
          b.setRow(bub.row);
          b.setPopped(bub.popped);

          res.addBubbles(b);
        }
      },
      Press: (req) => {
        const col = req.getCol();
        const row = req.getRow();

        setBubbles((prev) =>
          prev.map((v) =>
            v.col === col && v.row === row ? { row, col, popped: true } : v
          )
        );
      },
    });

    return () => server.removeService(BubbleService);
  }, [server]);

  return (
    <div className="BubbleWrap" style={{ display: "grid" }}>
      {bubbles.map((bubble) => {
        const col = String(bubble.col + 1);
        const row = String(bubble.row + 1);

        return (
          <div key={row + " " + col} style={{ gridRow: row, gridColumn: col }}>
            {bubble.popped ? "💥" : "🎾"}
          </div>
        );
      })}
    </div>
  );
};

export const Bubblewrap = { Server, Client };
