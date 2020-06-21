import { useState, useEffect } from "react";
import { SignalClient } from "./signal";
import { useDispatch } from "react-redux";
import { PeerServiceServer, PeerServiceClient } from "./peerService";

export const useSignal = (uuid: string) => {
  const [connection, setConnection] = useState<SignalClient>();
  const dispatch = useDispatch();

  useEffect(() => {
    const client = new SignalClient(uuid, dispatch);

    setConnection(client);

    (window as any).client = client;

    return () => {
      client.disconnect();
    };
  }, [uuid]);

  return connection;
};

export const usePeerServer = (uuid: string) => {
  const [server, setServer] = useState<PeerServiceServer>();
  const dispatch = useDispatch();

  useEffect(() => {
    const server = new PeerServiceServer(uuid, dispatch);

    setServer(server);
  }, [uuid]);

  return server;
};

export const usePeerClient = (uuid: string) => {
  const [client, setClient] = useState<PeerServiceClient>();
  const dispatch = useDispatch();

  useEffect(() => {
    const client = new PeerServiceClient(uuid, dispatch);

    setClient(client);
  }, [uuid]);

  return client;
};
