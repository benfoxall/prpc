import React, {
  FunctionComponent,
  useState,
  useContext,
  useEffect,
  useRef,
  FormEventHandler,
} from "react";
import pirateSpeak from "pirate-speak";

import { ClientContext } from "../Join";
import { ServerContext } from "../Host";
import { Dev } from "../lib/protos/generated/dev_pb_service";
import { ChatService } from "../lib/protos/generated/chat_pb_service";
import { Message } from "../lib/protos/generated/chat_pb";
import { useSelector } from "../reducers";
import { useDB } from "../lib/hooks";

const time = new Intl.DateTimeFormat("en-gb", {
  hour: "numeric",
  minute: "numeric",
});

const emojiList = Array.from(
  "😀🤩🥳🤓🤯😨👹👻💩🤡🙌💪🦿👀🗣🧠👥🧕" +
    "👮👩‍🎤🧑‍🎤👩‍🔬👨‍🔬🦹‍♀️🧜🧚‍♂️🕺🧶👞👑⛑👒🐰🐹🐯🦁" +
    "🐔🐗🦞🦕🦖🦚🦜🌷💐🍄🍁🌼⚡️💥🌈☀️🪐🥝"
);

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
  const [uppercase, setUppercase] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [pirate, setPirate] = useState(false);
  const settings = useRef({ uppercase, emoji, pirate });
  settings.current = { uppercase, emoji, pirate };

  const uuid = useSelector((a) => a.connection.uuid);
  const db = useDB(uuid || undefined);

  useEffect(() => {
    if (!server) return;
    if (!db) return;

    const updates = new Set<(m: Message) => void>();
    const messageList: Message[] = [];
    let id = 1;

    db.chat
      .each((item) => {
        id = Math.max(item.id + 1, id);

        messageList.push(Message.deserializeBinary(item.data));
      })
      .then(() => {
        setCount(messageList.length);
      });

    server.addService(ChatService, {
      Send(req, message, meta) {
        message.setId(id++);
        message.setAuthor(meta.peerId);
        message.setBody(req.getBody().slice(0, 300));
        message.setPosttime(+new Date());

        const { uppercase, emoji, pirate } = settings.current;

        if (uppercase) {
          message.setBody(message.getBody().toLocaleUpperCase());
        }
        if (emoji) {
          const body = Array.from(message.getBody())
            .map((c) => emojiList[Math.floor(Math.random() * emojiList.length)])
            .join("");
          message.setBody(body);
        }
        if (pirate) {
          message.setBody(pirateSpeak.translate(message.getBody()));
        }

        messageList.push(message);

        setCount(messageList.length);

        console.log(`Updating: ${updates.size} callbacks`);

        updates.forEach((up) => {
          up(message);
        });

        db.chat.add({
          id: message.getId(),
          data: message.serializeBinary(),
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
  }, [server, db]);

  return (
    <>
      <h1>Chat server</h1>
      <h4>Messages: {count}</h4>
      <p>
        <label>
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.currentTarget.checked)}
          />
          Uppercase
        </label>
      </p>
      <p>
        <label>
          <input
            type="checkbox"
            checked={emoji}
            onChange={(e) => setEmoji(e.currentTarget.checked)}
          />
          Emoji
        </label>
      </p>
      <p>
        <label>
          <input
            type="checkbox"
            checked={pirate}
            onChange={(e) => setPirate(e.currentTarget.checked)}
          />
          Pirate
        </label>
      </p>
    </>
  );
};

export const Chat = { Server, Client };
