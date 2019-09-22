import React, { FunctionComponent, useState, useContext, useEffect } from "react";
import { ClientContext } from "./Join";
import { ServerContext } from "./Host";
import { Dev } from "./lib/protos/generated/dev_pb_service";


const Host: FunctionComponent = () => {
    const [color, setColor] = useState('#000000')
    const server = useContext(ServerContext);

    useEffect(() => {
        if (server) {

            server.addService(Dev, {
                Background: (req) => setColor(req.getValue())
            })

            return () => {
                server.removeService(Dev)
            }
        }

    }, [server])



    return <h1 style={{ backgroundColor: color }}>DEBUG SERVER</h1>;
}


const Join: FunctionComponent = () => {
    const [color, setColor] = useState('#000000')

    const client = useContext(ClientContext);

    useEffect(() => {
        if (color && client) {
            const devService = client.getService(Dev)
            devService("Background", res => res.setValue(color))
        }

    }, [color, client])

    return <>
        <h1>DEBUG CLIENT</h1>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
    </>
}



export const Debug = { Host, Join };
