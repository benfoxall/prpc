
import { useState, useEffect } from 'react';
import { SignalClient } from './signal';
import { useDispatch } from 'react-redux';
import { SET_UUID, SET_ERROR, IS_ACTIVE } from '../reducers/connection';

export const useSignal = (uuid: string) => {

    const [connection, setConnection] = useState<SignalClient>();
    const dispatch = useDispatch();

    useEffect(() => {
        const client = new SignalClient(
            uuid,
            (type, payload) => {
                console.log("_", type, payload)
                dispatch({ type, payload })
            }
        );

        // dispatch({
        //     type: IS_ACTIVE
        // })

        // client.auth
        //     .then(s => {
        //         dispatch({
        //             type: SET_UUID,
        //             payload: s
        //         })
        //     })
        //     .catch(s => {
        //         dispatch({
        //             type: SET_ERROR,
        //             payload: s
        //         })
        //     })


        setConnection(client);

        (window as any).client = client;

        return () => {
            client.disconnect()
        }

    }, [uuid]);

    return connection;

}
