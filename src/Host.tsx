import React, { FunctionComponent, createContext } from "react";
import { usePeerServer } from "./lib/hooks";
import { useSelector } from "./reducers";
import { LinkTo, Route } from "./routing";
import { PeerServiceServer } from "./lib/peerService";
import { Debug } from "./services/Debug";
import { SyncPath } from "./services/SyncPath";
import { Chat } from "./services/Chat";
import { Trails } from "./services/Trails";
import { Cameras } from "./services/Cameras";
// import { Position } from "./services/Position";
import { Content } from "./services/Content";
import { Calculator } from "./services/Calculator";
import { Bubbles } from "./services/Bubbles";
import { Clock } from "./services/Clock";

export const ServerContext = createContext<PeerServiceServer>(null);

export const Host: FunctionComponent<{ name: string }> = ({ name }) => {
  const path = useSelector((app) => app.route.path);

  const peerServer = usePeerServer(name);

  return (
    <ServerContext.Provider value={peerServer}>
      <SyncPath.Server />
      <main className="Host">
        <h2>
          <LinkTo href="/">⤶</LinkTo> {path}
        </h2>

        <Route path="/">
          <ul>
            <li>
              <LinkTo href="/Debug">Debug</LinkTo>
            </li>

            <li>
              <LinkTo href="/Calculator">Calculator</LinkTo>
            </li>

            <li>
              <LinkTo href="/Content">Content</LinkTo>
            </li>

            <li>
              <LinkTo href="/Chat">Chat</LinkTo>
            </li>

            <li>
              <LinkTo href="/Cameras">Cameras</LinkTo>
            </li>

            <li>
              <LinkTo href="/Bubbles">Bubbles</LinkTo>
            </li>

            <li>
              <LinkTo href="/Clock">Clock</LinkTo>
            </li>

            <li>
              <LinkTo href="/Trails">Trails</LinkTo>
            </li>

            <li>
              <LinkTo href="/Position">WIP: Position</LinkTo>
            </li>

            <li>TODO: Audio</li>

            <li>TODO: BLE</li>
          </ul>
        </Route>

        <Route path="/Debug">
          <Debug.Server />
        </Route>

        <Route path="/Calculator">
          <Calculator.Server />
        </Route>

        <Route path="/Content">
          <Content.Server />
        </Route>

        <Route path="/Chat">
          <Chat.Server />
        </Route>

        <Route path="/Bubbles">
          <Bubbles.Server />
        </Route>

        <Route path="/Clock">
          <Clock.Server />
        </Route>

        <Route path="/Trails">
          <Trails.Server />
        </Route>

        <Route path="/Cameras">
          <Cameras.Server />
        </Route>

        {/* <Route path="/Position">
          <Position.Server />
        </Route> */}
      </main>
    </ServerContext.Provider>
  );
};
