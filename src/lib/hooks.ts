
import { useState, useEffect } from 'react';
import { SignalClient } from './signal';
import { useDispatch } from 'react-redux';
import { PeerServer, PeerClient } from './peerBase';
import { PeerRPCServer, PeerRPCClient } from './peerRPC';
import { PeerServiceServer, PeerServiceClient } from './peerService';
import { Dev } from './protos/generated/dev_pb_service'


export const useSignal = (uuid: string) => {

    const [connection, setConnection] = useState<SignalClient>();
    const dispatch = useDispatch();

    useEffect(() => {
        const client = new SignalClient(
            uuid,
            dispatch
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


    const [server, setServer] = useState<PeerServiceServer<typeof Dev>>();
    const dispatch = useDispatch();

    useEffect(() => {
        const server = new PeerServiceServer(uuid, Dev, {
            Background: (req, res) => {
                console.log("BACKGORUND: ", req.getValue())

                document.body.style.background = req.getValue()
            }
        }, dispatch);

        setServer(server)

    }, [uuid]);

    return server;

}



export const usePeerClient = (uuid: string) => {

    const [client, setClient] = useState<PeerServiceClient<typeof Dev>>();
    const dispatch = useDispatch();

    useEffect(() => {
        const client = new PeerServiceClient(uuid, Dev, dispatch);

        client.issue("Background", (e) => e.setValue(Math.random().toString(16)))

        setClient(client)

    }, [uuid]);

    return client;

}
