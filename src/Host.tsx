import React, { FunctionComponent, useEffect, useMemo, MouseEventHandler, useRef } from 'react';
import { usePeerServer } from './lib/hooks';
import { Dev } from './lib/protos/generated/dev_pb_service';
import { useSelector } from './reducers';
import { useDispatch } from 'react-redux';
import { Actions } from './reducers/route';
import { Meta } from './lib/protos/generated/meta_pb_service';
import { LinkTo, Route } from './routing';

// const pathCallbacks = new Set<(path: string) => void>();

export const Host: FunctionComponent<{ name: string }> = ({ name }) => {

    const pathCallbacks = useMemo(() => new Set<(path: string) => void>(), [])

    const route = useSelector(app => app.route)

    const peerServer = usePeerServer(name);

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


        // @ts-ignore
        window.server = peerServer
    }, [peerServer])


    useEffect(() => {

        pathCallbacks.forEach(cb => cb(route.path))

    }, [pathCallbacks, route])



    return (
        <main className="Host">
            <h2>
                <LinkTo href="/">⤶</LinkTo> {route.path}
            </h2>


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

            <h2>PATH {route.path}</h2>

            <Route path="/Debug" >
                <h1>This is the debug panel</h1>
            </Route>


        </main>
    )
}



