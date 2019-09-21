import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { SignalClient } from './lib/signal';
import { useSignal, usePeerServer } from './lib/hooks';

export const Host: FunctionComponent<{ name: string }> = ({ name }) => {

    // const signal = useSignal(name);

    const peerServer = usePeerServer(name);

    useEffect(() => {
        if (peerServer) {
            peerServer.on('data', (client, data) => {
                console.log("YAYYYY, NO SERVER", client, data)
            })
        }
    }, [peerServer])


    return (<>
        <h2>Web Browser Server <small>({name})</small></h2>

        <ul>
            <li>
                Debug
            </li>

            <li>
                Chat
            </li>

            <li>
                Trails
            </li>
        </ul>

    </>)
}
