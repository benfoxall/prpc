import React, { FunctionComponent, createContext } from 'react';
import { usePeerClient } from './lib/hooks';
import { Route } from './routing';
import { useSelector } from './reducers';
import { PeerServiceClient } from './lib/peerService';
import { Debug } from './services/Debug';
import { SyncPath } from './services/SyncPath';

let LOCAL = sessionStorage.getItem('LOCAL_ID') || Math.random().toString(36).slice(1)
sessionStorage.setItem('LOCAL_ID', LOCAL)

export const ClientContext = createContext<PeerServiceClient>(null)

export const Join: FunctionComponent<{ name: string }> = ({ name }) => {

    const path = useSelector(app => app.route.path)
    const client = usePeerClient(name);

    return (
        <ClientContext.Provider value={client}>
            <SyncPath.Client />
            <h2>
                → {name} {path}
            </h2>

            <Route path="/Debug">
                <Debug.Client />
            </Route>

        </ClientContext.Provider>
    )
}
