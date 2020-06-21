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
import { useSelector } from "../reducers";

const time = new Intl.DateTimeFormat("en-gb", {
  hour: "numeric",
  minute: "numeric",
});

const Client: FunctionComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const text = useRef<HTMLInputElement>();

  const anchor = useRef<HTMLLIElement>();

  const uuid = useSelector((a) => a.connection.uuid);

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

    let stop = false;

    const run = async () => {
      const service = client.getServiceStream(ChatService);

      for await (const message of service("List")) {
        if (stop) break;

        setMessages((prior) => prior.concat(message));

        anchor.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    };
    run();

    return () => (stop = true);
  }, [client]);

  return (
    <section className="ChatUI">
      <ol>
        {messages.map((m) => (
          <li key={m.getId()} className={m.getAuthor() === uuid ? "self" : ""}>
            <span className="name">{m.getAuthor()}</span>
            <time className="time">
              {time.format(new Date(m.getPosttime()))}
            </time>
            <span className="body">{m.getBody()}</span>
          </li>
        ))}
        <li className="anchor" ref={anchor}></li>
      </ol>
      <form onSubmit={submit}>
        <input type="text" ref={text} />
        <button>►</button>
      </form>
    </section>
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
        message.setBody(req.getBody().slice(0, 300));
        message.setPosttime(+new Date());

        messageList.push(message);

        setCount(messageList.length);

        console.log(`Updating: ${updates.size} callbacks`);

        updates.forEach((up) => {
          up(message);
        });
      },

      async *List() {
        for (const message of messageList.slice(-30)) {
          yield message;
        }

        while (true) {
          let resolve: (m: Message) => void;
          const promise = new Promise<Message>((r) => (resolve = r));
          updates.add(resolve);
          const message = await promise;
          updates.delete(resolve);

          yield await message;
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
