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

      for await (const bub of stream("GetAll")) {
        bubs.push(bub.toObject());
      }

      setBubbles(bubs);

      for await (const bub of stream("Popped")) {
        console.log("POP", bub);
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
    <div className="BubbleWrap" style={{ display: "grid" }}>
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

  const rows = 10;
  const cols = 10;
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  // get a ref to the bubbles for within the service
  const bubbleRef = useRef(bubbles);
  bubbleRef.current = bubbles;

  useEffect(() => {
    if (!server) return;

    let list: Bubble[] = [];

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

    // this could definitely drop pops, but meh
    // let resolve: () => void;
    // let pop = new Promise(res => resolve = res)
    // const chain = {
    //   res: null,
    //   next: new Promise(_ => this.res = _)
    // }

    // const c = {}

    // for(thing of c) {

    // }

    //  let resolve: (bub: Bubble) => void;
    //  let pop = new Promise<Bubble>(res => resolve = res)

    // async function* listen () {
    //   const bub = await pop;

    // }
    // const notify = (bub: Bubble) => {
    //   resolve(bub)
    // }

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
      // this is way inefficient, but kind of cool
      async *GetAll() {
        for (const bub of list) {
          yield bub;
        }
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

          // notify any listners
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
    <div className="BubbleWrap" style={{ display: "grid" }}>
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

export const Bubblewrap = { Server, Client };
