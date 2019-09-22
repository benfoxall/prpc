import React, { FunctionComponent, useEffect, useMemo, MouseEventHandler, useRef, createContext, useContext } from 'react';
import { usePeerServer } from './lib/hooks';
import { useSelector } from './reducers';
import { Meta } from './lib/protos/generated/meta_pb_service';
import { LinkTo, Route } from './routing';
import { PeerServiceServer } from './lib/peerService';
import { Debug } from './services/Debug';

export const ServerContext = createContext<PeerServiceServer>(null)

export const Host: FunctionComponent<{ name: string }> = ({ name }) => {

    const path = useSelector(app => app.route.path)

    const peerServer = usePeerServer(name);

    return (
        <ServerContext.Provider value={peerServer}>
            <SyncPath />
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





const SyncPath: FunctionComponent = () => {
    const peerServer = useContext(ServerContext)

    const pathCallbacks = useMemo(() => new Set<(path: string) => void>(), [])

    const route = useSelector(app => app.route)
    const path = useRef(route.path)
    path.current = route.path;

    useEffect(() => {
        if (!peerServer) return;

        peerServer.addService(Meta, {
            getPage: (req, res) => {
                res.setName(path.current)
            },
            getPageChange: async (req, res) => {
                if (req.getName() !== path.current) {
                    res.setName(path.current)
                } else {
                    let resolve: (path: string) => void;
                    const promise = new Promise<string>(r => resolve = r);

                    pathCallbacks.add(resolve)

                    res.setName(await promise);
                }
            }
        })

        return () => {
            peerServer.removeService(Meta);
        }

        // @ts-ignore
        window.server = peerServer
    }, [peerServer])


    useEffect(() => {
        pathCallbacks.forEach(cb => cb(route.path))
    }, [pathCallbacks, route])


    return null;

}
