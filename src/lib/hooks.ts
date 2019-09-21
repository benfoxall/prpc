
import { useState, useEffect } from 'react';
import { SignalClient } from './signal';
import { useDispatch } from 'react-redux';
import { PeerServer, PeerClient } from './peerBase';

export const useSignal = (uuid: string) => {

    const [connection, setConnection] = useState<SignalClient>();
    const dispatch = useDispatch();

    useEffect(() => {
        const client = new SignalClient(
            uuid,
            (type, payload) => dispatch({ type, payload })
        );

        setConnection(client);

        (window as any).client = client;

        return () => {
            client.disconnect()
        }

    }, [uuid]);

    return connection;

}

export const usePeerServer = (uuid: string) => {

    const [connection, setConnection] = useState<PeerServer>();
    const dispatch = useDispatch();

    useEffect(() => {
        const server = new PeerServer(uuid);

        setConnection(server)

    }, [uuid]);

    return connection;

}



export const usePeerClient = (uuid: string) => {

    const [connection, setConnection] = useState<PeerClient>();
    const dispatch = useDispatch();

    useEffect(() => {
        const server = new PeerClient(uuid);

        setConnection(server)

    }, [uuid]);

    return connection;

}
