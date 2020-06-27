import React, {
  FunctionComponent,
  useContext,
  useState,
  useEffect,
} from "react";
import { ServerContext } from "../Host";
import { SpaceService } from "../lib/protos/generated/spaceInvaders_pb_service";

interface SpaceShipSchtate {
  position: number;
  // rockets: number[],
}

interface Rocket {
  ship: string;
  x: number;
  y: number;
}

type ShipState = Record<string, SpaceShipSchtate>;
type RocketState = Rocket[];

export const Server: FunctionComponent = () => {
  const positionMax = 1.0;
  const server = useContext(ServerContext);

  const [ships, setShips] = useState<ShipState>({});
  const [rockets, setRockets] = useState<RocketState>([]);
  const [targets, setTargets] = useState<Rocket[]>(() =>
    Array.from({ length: 20 }, (_, i) => ({
      ship: "meh",
      x: i / 20,
      y: 0.9,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      let hack: RocketState = [];

      setRockets(
        (prev) =>
          (hack = prev
            .map((rocket) => ({ ...rocket, y: rocket.y + 0.01 }))
            .filter((rocket) => rocket.y < 1))
      );

      setTargets((targets) =>
        targets.filter(
          (target) =>
            !hack.some((rocket) => {
              const dx = Math.abs(rocket.x - target.x);
              const dy = Math.abs(rocket.y - target.y);

              return dx + dy < 0.04;
            })
        )
      );
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!server) return;

    // stash the gamestate for launching rockets
    let lastShipState: ShipState = {};

    let c = 0;
    server.addService(SpaceService, {
      Fire: (req, _res, meta) => {
        const ship = lastShipState[meta.peerId];
        if (!ship) return;

        const rocket: Rocket = {
          ship: meta.peerId,
          x: ship.position,
          y: 0,
        };

        setRockets((prev) => prev.concat(rocket).slice(0, 30));
      },
      Move: (req, _res, meta) => {
        setShips((prior) => {
          let position = prior[meta.peerId]?.position || positionMax / 2;

          // This is how you write comments in JS Ben 👇
          // We need to check for out-of-bounds moves, otherwise the division below makes things janky
          if (
            (req.getDirection() < 0 && position > 0) ||
            (req.getDirection() > 0 && position < positionMax)
          ) {
            position += req.getDirection() / 100;
          }

          const next: ShipState = {
            ...prior,

            [meta.peerId]: {
              position,
            },
          };

          lastShipState = next;

          return next;
        });
      },
    });

    return () => {
      server.removeService(SpaceService);
    };
  }, [server]);

  return (
    <div className="Debug">
      <div
        style={{
          position: "relative",
          width: "80vw",
          height: "80vw",
          background: "rgba(255,255,255,0.1)",
        }}
      >
        <div>
          {rockets.map((rocket, i) => {
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: rocket.x * 100 + "%",
                  bottom: rocket.y * 100 + "%",
                }}
              >
                🦞
              </div>
            );
          })}
        </div>
        <div>
          {targets.map((rocket, i) => {
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: rocket.x * 100 + "%",
                  bottom: rocket.y * 100 + "%",
                }}
              >
                👾
              </div>
            );
          })}
        </div>
        <div>
          {Object.entries(ships).map(([id, spaceship]) => {
            return (
              <div
                key={id}
                style={{
                  position: "absolute",
                  left: spaceship.position * 100 + "%",
                  bottom: 0,
                  transform: "rotate(-45deg)",
                }}
              >
                🚀
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
