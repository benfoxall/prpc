import React, { FunctionComponent, useState, useContext, useEffect } from "react";
import { ClientContext } from "../Join";
import { ServerContext } from "../Host";
import { Dev } from "../lib/protos/generated/dev_pb_service";


const EMOJI_LIST = Array.from(
    '🐙🤘👻🍀⭐🍩🍕🌶🌞👾🤖🧶🦜🌈⭐⚡🛹🎸'
)

const Client: FunctionComponent = () => {
    const [selected, setSelected] = useState(0);

    const client = useContext(ClientContext);

    useEffect(() => {
        if (client) {
            const devService = client.getService(Dev)
            devService("SetEmoji", res => res.setChoice(selected))
        }

    }, [selected, client])

    return <div className="Debug">

        <div className="EmojiList">
            {EMOJI_LIST.map((item, i) =>
                <button key={i} onClick={e => setSelected(i)} className={selected === i && 'selected'}>
                    {item}
                </button>
            )}
        </div>
    </div>
}


const Server: FunctionComponent = () => {

    const server = useContext(ServerContext);

    const [clients, setClients] = useState<Map<string, number>>(new Map);

    useEffect(() => {
        if (!server) return

        server.addService(Dev, {
            SetEmoji: (req, _res, meta) => {
                setClients(prev => {
                    const next = new Map(prev);

                    next.set(
                        meta.peerId, req.getChoice()
                    )

                    return next;
                })
            }
        })

        return () => {
            server.removeService(Dev)
        }


    }, [server])

    return <div className="Debug">
        {Array.from(clients).map(([name, color]) =>
            <h2 key={name}>
                <span>
                    {EMOJI_LIST[color] || '❓'}
                </span>
                {name}
            </h2>
        )}
    </div>
}


export const Debug = { Server, Client };
