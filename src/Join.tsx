import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { SignalClient } from './lib/signal';
import { useSignal, usePeerClient } from './lib/hooks';
import { Dev } from './lib/protos/generated/dev_pb_service';

let LOCAL = sessionStorage.getItem('LOCAL_ID') || Math.random().toString(36).slice(1)
sessionStorage.setItem('LOCAL_ID', LOCAL)

export const Join: FunctionComponent<{ name: string }> = ({ name }) => {
    const [color, setColor] = useState<string>('#ffffff')

    const client = usePeerClient(name);

    useEffect(() => {
        if (color && client) {
            client.issue(Dev, 'Background', res => res.setValue(color))
        }

    }, [color, client])

    return (<>
        <h2>
            JOINING <small>({name})</small>
        </h2>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
    </>)
}
