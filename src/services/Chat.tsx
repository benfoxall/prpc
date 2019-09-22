import React, { FunctionComponent, useState, useContext, useEffect, useRef, FormEventHandler } from "react";
import { ClientContext } from "../Join";
import { ServerContext } from "../Host";
import { Dev } from "../lib/protos/generated/dev_pb_service";
import { ChatService } from "../lib/protos/generated/chat_pb_service";
import { Message } from "../lib/protos/generated/chat_pb";


const Client: FunctionComponent = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const text = useRef<HTMLInputElement>()

    const client = useContext(ClientContext);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (text.current.value.trim() === '') return

        const chat = client.getService(ChatService);

        chat("PostMessage", req => {
            req.setBody(text.current.value)
            text.current.value = ''
        })

    }


    useEffect(() => {
        if (!client) return;

        let max = 500;
        let stop = false;

        const run = async () => {

            const chat = client.getService(ChatService);

            const list = await chat("getMessageList")

            setMessages(list.getListList())

            while (!stop && max-- > 0) {
                const message = await chat("newMessages");
                setMessages(prior => prior.concat(message.getListList()))
            }

        }
        run()

        return () => stop = true

    }, [client])

    return <>
        <h3>Messages</h3>
        <ul>
            {messages.map(m =>
                <li key={m.getId()}>{m.getBody()} ({m.getAuthor()})</li>
            )}
        </ul>
        <form onSubmit={submit} >
            <input type="text" ref={text} />
        </form>
    </>
}



const Server: FunctionComponent = () => {

    const server = useContext(ServerContext);

    useEffect(() => {
        if (!server) return

        const updates = new Set<(m: Message) => void>();
        const messageList: Message[] = []
        let id = 1;

        server.addService(ChatService, {
            PostMessage: (req, response, meta) => {
                response.setId(id++);
                response.setAuthor(meta.peerId)
                response.setBody(req.getBody())
                response.setPosttime(+ new Date)

                messageList.push(response)

                updates.forEach(up => {
                    up(response)
                })
            },

            getMessageList: (req, res) => {
                res.setListList(messageList);
            },

            newMessages: async (req, res) => {
                let resolve: () => void;
                const promise = new Promise<Message>(r => resolve = r);
                updates.add(resolve)

                return promise
                    .then(m => {
                        // backfill?
                        res.addList(m)
                    })

            }
        })

        return () => {
            server.removeService(Dev)
        }


    }, [server])

    return <>
        <h1>Chat server</h1>
        <h4>Messages: {12}</h4>
    </>
}


export const Chat = { Server, Client };
