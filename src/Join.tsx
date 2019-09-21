import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { SignalClient } from './lib/signal';
import { useSignal } from './lib/hooks';

let LOCAL = sessionStorage.getItem('LOCAL_ID') || Math.random().toString(36).slice(1)
sessionStorage.setItem('LOCAL_ID', LOCAL)

export const Join: FunctionComponent<{ name: string }> = ({ name }) => {

    const signal = useSignal(name + LOCAL);

    useEffect(() => {
        console.log("signal", signal)
        if (signal) {
            setTimeout(() => {
                signal.send(name, "stuff here")
            }, 500)

        }

    }, [signal])

    return (<>
        <h2>
            JOINING <small>({name})</small>
        </h2>
    </>)
}
