import React, { FunctionComponent, createContext } from 'react';
import { usePeerServer } from './lib/hooks';
import { useSelector } from './reducers';
import { LinkTo, Route } from './routing';
import { PeerServiceServer } from './lib/peerService';
import { Debug } from './services/Debug';
import { SyncPath } from './services/SyncPath';

export const ServerContext = createContext<PeerServiceServer>(null)

export const Host: FunctionComponent<{ name: string }> = ({ name }) => {

    const path = useSelector(app => app.route.path)

    const peerServer = usePeerServer(name);

    return (
        <ServerContext.Provider value={peerServer}>
            <SyncPath.Server />
            <main className="Host">
                <h2>
                    <LinkTo href="/">⤶</LinkTo> {path}
                </h2>

                <Route path="/" >
                    <ul>
                        <li>
                            <LinkTo href="/Debug">Debug</LinkTo>
                        </li>

                        <li>
                            <LinkTo href="/Chat">Chat</LinkTo>
                        </li>

                        <li>
                            <LinkTo href="/Trails">Trails</LinkTo>
                        </li>
                    </ul>
                </Route>

                <Route path="/Debug" >
                    <Debug.Server />
                </Route>

            </main>
        </ServerContext.Provider>
    )
}


