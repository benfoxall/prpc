import {
  FunctionComponent,
  useContext,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { useSelector } from "../reducers";
import { ServerContext } from "../Host";
import { Meta } from "../lib/protos/generated/meta_pb_service";
import { useDispatch } from "react-redux";
import { ClientContext } from "../Join";
import { Actions } from "../reducers/route";

const Client: FunctionComponent = () => {
  const dispatch = useDispatch();

  const client = useContext(ClientContext);

  useEffect(() => {
    if (client) {
      const metaService = client.getService(Meta);

      let stop = false;

      let current = "___";

      // long-polling type requests
      const listen = async () => {
        if (stop) return;

        const response = await metaService("getPageChange", (req) =>
          req.setName(current)
        );
        current = response.getName();

        dispatch({ type: Actions.SET_PATH, payload: response.getName() });

        // throttle requests
        await new Promise((resolve) => setTimeout(resolve, 500));

        listen();
      };

      listen();

      return () => {
        stop = true;
      };
    }
  }, [client]);

  return null;
};

const Server: FunctionComponent = () => {
  const peerServer = useContext(ServerContext);

  const pathCallbacks = useMemo(() => new Set<(path: string) => void>(), []);

  const route = useSelector((app) => app.route);
  const path = useRef(route.path);
  path.current = route.path;

  useEffect(() => {
    if (!peerServer) return;

    peerServer.addService(Meta, {
      getPage: (req, res) => {
        res.setName(path.current);
      },
      getPageChange: async (req, res) => {
        if (req.getName() !== path.current) {
          res.setName(path.current);
        } else {
          let resolve: (path: string) => void;
          const promise = new Promise<string>((r) => (resolve = r));

          pathCallbacks.add(resolve);

          res.setName(await promise);
        }
      },
    });

    return () => {
      peerServer.removeService(Meta);
    };
  }, [peerServer]);

  useEffect(() => {
    pathCallbacks.forEach((cb) => cb(route.path));
  }, [pathCallbacks, route]);

  return null;
};

export const SyncPath = { Server, Client };
