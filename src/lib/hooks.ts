import { useEffect, useMemo } from "react";
import { SignalClient } from "./signal";
import { useDispatch } from "react-redux";
import { PeerServiceServer, PeerServiceClient } from "./peerService";

export const useSignal = (uuid: string) => {
  const dispatch = useDispatch();

  const connection = useMemo(() => new SignalClient(uuid, dispatch), [uuid]);
  useEffect(() => () => connection.disconnect(), [connection]);

  return connection;
};

export const usePeerServer = (uuid: string) => {
  const dispatch = useDispatch();

  const server = useMemo(() => new PeerServiceServer(uuid, dispatch), [uuid]);

  return server;
};

export const usePeerClient = (uuid: string) => {
  const dispatch = useDispatch();

  const client = useMemo(() => new PeerServiceClient(uuid, dispatch), [uuid]);

  return client;
};
