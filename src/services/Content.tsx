import React, { FunctionComponent, useState, useContext, useEffect, useRef, FormEventHandler, MutableRefObject, useMemo } from "react";
import { ClientContext } from "../Join";
import { ServerContext } from "../Host";
import { ContentService } from "../lib/protos/generated/content_pb_service";
import ReactMarkdown from 'react-markdown';

const Client: FunctionComponent = () => {
    const [source, setSource] = useState('');

    const client = useContext(ClientContext);

    useEffect(() => {
        if (!client) return;

        const content = client.getService(ContentService);

        let stop = false;

        let lastID = -1;

        let loop = async () => {

            const value = await content("Wait", req => req.setId(lastID));

            if (stop) return;

            setSource(value.getBody())

            lastID = value.getId()

            loop()
        }

        loop()


        return () => { stop = true }
    }, [client])

    return <div className="Content">
        <hr />
        <ReactMarkdown source={source} />

    </div>
}



const Server: FunctionComponent = () => {
    const [content, setContent] = useState<[number, string]>([1, "# Hello"]);

    const server = useContext(ServerContext);
    const waiting = useMemo(() => new Set<(value: [number, string]) => void>(), [])

    const contentRef = useRef(content);
    contentRef.current = content;

    useEffect(() => {
        if (!server) return;

        server.addService(ContentService, {
            Wait: async (req, res) => {

                if (req.getId() === contentRef.current[0]) {
                    await new Promise<[number, string]>(resolve => {
                        waiting.add(resolve)
                    })
                }

                res.setBody(contentRef.current[1])
                res.setId(contentRef.current[0])

            }
        })

        return () => {
            server.removeService(ContentService);

            waiting.forEach((c) => { c([-1, "-"]) })
        }
    }, [server])

    useEffect(() => {
        console.log("sadfas", content)
        waiting.forEach((c) => { c(content) })
        waiting.clear()

    }, [content])

    return <div className="Content">

        <textarea
            value={content[1]}
            onChange={e =>
                setContent([content[0] + 1, e.target.value])
            }
        ></textarea>

    </div>
}


export const Content = { Server, Client };

