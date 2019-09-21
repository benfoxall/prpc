import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { usePeerServer } from './lib/hooks';
import { Dev } from './lib/protos/generated/dev_pb_service';

export const Host: FunctionComponent<{ name: string }> = ({ name }) => {

    const peerServer = usePeerServer(name);

    useEffect(() => {

        if (!peerServer) return;

        peerServer.addService(Dev, {
            Background: (e) => {
                document.body.style.background = e.getValue();
            }
        })


        // @ts-ignore
        window.server = peerServer
    }, [peerServer])


    return (
        <main className="Host">
            <h2>Web Browser Server <small>({name})</small></h2>

            <ul>
                <li>
                    <a href="/Debug">Debug</a>
                </li>

                <li>
                    Chat
                </li>

                <li>
                    Trails
                </li>
            </ul>

        </main>
    )
}
