import React, { FunctionComponent, useState, useContext, useEffect } from "react";
import { ClientContext } from "../Join";
import { ServerContext } from "../Host";
import { Dev } from "../lib/protos/generated/dev_pb_service";


const Client: FunctionComponent = () => {
    const [color, setColor] = useState('#000000')

    const client = useContext(ClientContext);

    useEffect(() => {
        if (client) {
            const devService = client.getService(Dev)
            devService("Background", res => res.setValue(color))
        }

    }, [color, client])

    return <>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
    </>
}


const Server: FunctionComponent = () => {

    const server = useContext(ServerContext);

    const [clients, setClients] = useState<Map<string, string>>(new Map);

    useEffect(() => {
        if (!server) return

        server.addService(Dev, {
            Background: (req, _res, meta) => {
                setClients(prev => {
                    const next = new Map(prev);

                    next.set(
                        meta.peerId, req.getValue()
                    )

                    return next;
                })
            }
        })

        return () => {
            server.removeService(Dev)
        }


    }, [server])

    return <>
        {Array.from(clients).map(([name, color]) =>
            <h2 key={name} style={{ color: color }}>{name}</h2>
        )}
    </>
}


export const Debug = { Server, Client };
