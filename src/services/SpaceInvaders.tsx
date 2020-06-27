import React, {
  FunctionComponent,
  useState,
  useContext,
  useEffect,
} from "react";
import { ClientContext } from "../Join";
import { ServerContext } from "../Host";
import { SpaceService } from "../lib/protos/generated/spaceInvaders_pb_service";

const Client: FunctionComponent = () => {
  const client = useContext(ClientContext);

  const fire = () => {
    const space = client.getService(SpaceService);
    space("Fire", () => {});
  };
  const left = () => {
    const space = client.getService(SpaceService);
    space("Move", (req) => {
      req.setDirection(-1);
    });
  };
  const right = () => {
    const space = client.getService(SpaceService);
    space("Move", (req) => {
      req.setDirection(1);
    });
  };
  const move = (amount) => {
    const space = client.getService(SpaceService);
    space("Move", (req) => {
      req.setDirection(amount);
    });
  };

  useEffect(() => {
    // GAMEPAD CODE HERE
    let cancel = false;
    let previousFire = false;
    // let previousDirection = 0;

    const loop = () => {
      var gamepads = navigator.getGamepads
        ? navigator.getGamepads()
        : navigator.webkitGetGamepads
        ? navigator.webkitGetGamepads()
        : [];
      if (gamepads[0]) {
        var gp = gamepads[0];
        // fire button is button 0
        if (gp.buttons[0].pressed) {
          if (!previousFire) {
            fire();
            previousFire = true;
          }
        } else {
          previousFire = false;
        }

        // movement with axis 0 (left joystick x axis)
        if (gp.axes[0] > 0.1) {
          // right?
          right();
        } else if (gp.axes[0] < -0.1) {
          left();
        } else {
          // move(0);
        }
      }

      if (!cancel) setTimeout(loop, 100);
    };

    loop();

    // cleanup
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <div>
      <button onClick={left}>left</button>
      <button onClick={right}>right</button>
      <button onClick={fire}>fire</button>
      THE GAME GOES HERE
    </div>
  );
};

import { Server } from "./SpaceInvaderServer";

export const SpaceInvaders = { Server, Client };
