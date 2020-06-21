import React, {
  FunctionComponent,
  useState,
  useContext,
  useEffect,
  useRef,
  FormEventHandler,
} from "react";
import { ClientContext } from "../Join";
import { ServerContext } from "../Host";
import { Dev } from "../lib/protos/generated/dev_pb_service";
import { ChatService } from "../lib/protos/generated/chat_pb_service";
import { Message } from "../lib/protos/generated/chat_pb";

const Client: FunctionComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const text = useRef<HTMLInputElement>();

  const client = useContext(ClientContext);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    if (text.current.value.trim() === "") return;

    const chat = client.getService(ChatService);

    chat("Send", (req) => {
      req.setBody(text.current.value);
      text.current.value = "";
    });
  };

  useEffect(() => {
    if (!client) return;

    let max = 500;
    let stop = false;

    const run = async () => {
      const service = client.getServiceStream(ChatService);

      for await (const message of service("List")) {
        setMessages((prior) => prior.concat(message));
      }
    };
    run();

    return () => (stop = true);
  }, [client]);

  return (
    <>
      <h3>Messages</h3>
      <ul>
        {messages.map((m) => (
          <li key={m.getId()}>
            {m.getBody()} ({m.getAuthor()})
          </li>
        ))}
      </ul>
      <form onSubmit={submit}>
        <input type="text" ref={text} />
      </form>
    </>
  );
};

const Server: FunctionComponent = () => {
  const server = useContext(ServerContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!server) return;

    const updates = new Set<(m: Message) => void>();
    const messageList: Message[] = [];
    let id = 1;

    server.addService(ChatService, {
      Send(req, message, meta) {
        message.setId(id++);
        message.setAuthor(meta.peerId);
        message.setBody(req.getBody());
        message.setPosttime(+new Date());

        messageList.push(message);

        setCount(messageList.length);

        updates.forEach((up) => {
          up(message);
        });
      },

      async *List() {
        for (const message of messageList) {
          yield message;
        }

        while (true) {
          let resolve: (m: Message) => void;
          const promise = new Promise<Message>((r) => (resolve = r));
          updates.add(resolve);

          const message = await promise;
          yield message;

          updates.delete(resolve);
        }
      },
    });

    return () => {
      server.removeService(Dev);
    };
  }, [server]);

  return (
    <>
      <h1>Chat server</h1>
      <h4>Messages: {count}</h4>
    </>
  );
};

export const Chat = { Server, Client };
