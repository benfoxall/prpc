import React, { FunctionComponent, createContext } from 'react';
import { usePeerClient } from './lib/hooks';
import { Route } from './routing';
import { useSelector } from './reducers';
import { PeerServiceClient } from './lib/peerService';
import { Debug } from './services/Debug';
import { SyncPath } from './services/SyncPath';
import { Chat } from './services/Chat';
import { Trails } from './services/Trails';
import { Cameras } from './services/Cameras';
import { Position } from './services/Position';
import { Content } from './services/Content';
import { Calculator } from './services/Calculator';

let LOCAL = sessionStorage.getItem('LOCAL_ID') || Math.random().toString(36).slice(1)
sessionStorage.setItem('LOCAL_ID', LOCAL)

export const ClientContext = createContext<PeerServiceClient>(null)

export const Join: FunctionComponent<{ name: string }> = ({ name }) => {

    const path = useSelector(app => app.route.path)
    const client = usePeerClient(name);

    return (
        <ClientContext.Provider value={client}>
            <SyncPath.Client />
            <main className="Join">
                <h2>
                    [{name}] {path}
                </h2>

                <Route path="/">
                    <h1>Hello!</h1>
                </Route>

                <Route path="/Debug">
                    <Debug.Client />
                </Route>

                <Route path="/Calculator" >
                    <Calculator.Client />
                </Route>

                <Route path="/Content">
                    <Content.Client />
                </Route>

                <Route path="/Chat" >
                    <Chat.Client />
                </Route>

                <Route path="/Trails" >
                    <Trails.Client />
                </Route>

                <Route path="/Cameras" >
                    <Cameras.Client />
                </Route>

                <Route path="/Position" >
                    <Position.Client />
                </Route>

            </main>

        </ClientContext.Provider>
    )
}
