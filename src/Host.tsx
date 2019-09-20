import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { SignalClient } from './lib/signal';

export const Host: FunctionComponent<{ name: string }> = ({ name }) => {

    // useEffect(() => {
    //     const client = new SignalClient(name)

    //     console.log(client)



    //     return client.disconnect
    // }, [name]);


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
