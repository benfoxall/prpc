import React, { FunctionComponent, useEffect, useState, createContext, useContext } from 'react';
import { usePeerClient } from './lib/hooks';
import { Dev } from './lib/protos/generated/dev_pb_service';
import { Meta } from './lib/protos/generated/meta_pb_service';
import { Route } from './routing';
import { useDispatch } from 'react-redux';
import { Actions } from './reducers/route'
import { useSelector } from './reducers';
import { PeerServiceClient } from './lib/peerService';
import { Debug } from './Debug';

let LOCAL = sessionStorage.getItem('LOCAL_ID') || Math.random().toString(36).slice(1)
sessionStorage.setItem('LOCAL_ID', LOCAL)

export const ClientContext = createContext<PeerServiceClient>(null)

export const Join: FunctionComponent<{ name: string }> = ({ name }) => {
    // const [color, setColor] = useState<string>('#ffffff')

    const path = useSelector(app => app.route.path)

    const client = usePeerClient(name);

    // useEffect(() => {
    //     if (color && client) {
    //         const devService = client.getService(Dev)
    //         devService("Background", res => res.setValue(color))
    //     }

    // }, [color, client])


    return (
        <ClientContext.Provider value={client}>
            <SyncPath />
            <h2>
                JOINING <small>({name})</small>
            </h2>
            <h3>PATH: {path}</h3>

            <Route path="/Debug">
                <h2>Debug!</h2>


                <Debug.Join />
            </Route>

        </ClientContext.Provider>
    )
}


const SyncPath: FunctionComponent = () => {
    const dispatch = useDispatch()

    const client = useContext(ClientContext);

    useEffect(() => {
        if (client) {
            const metaService = client.getService(Meta)

            let stop = false

            let current = '___'

            // long-polling type requests
            const listen = async () => {
                if (stop) return;

                const response = await metaService("getPageChange", (req) => req.setName(current));
                current = response.getName();

                dispatch({ type: Actions.SET_PATH, payload: response.getName() })

                // throttle requests
                await new Promise(resolve => setTimeout(resolve, 500))

                listen()
            }

            listen();


            return () => { stop = true }
        }
    }, [client])

    return null;
}
