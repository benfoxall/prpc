import { PeerRPCServer, PeerRPCClient, Meta } from "./peerRPC";
import { Dispatch } from "redux";
import { Message } from "google-protobuf";

type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};
type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];

type SubType<Base, Condition> = Pick<Base, AllowedNames<Base, Condition>>;

type Service = {
  readonly requestType: any;
  readonly responseType: any;
};

type Implementation<S> = {
  readonly [P in keyof S]?: S[P] extends Service ? (
    request: InstanceType<S[P]["requestType"]>,
    response: InstanceType<S[P]["responseType"]>,
    meta: Meta,
  ) =>
    | void
    | Promise<void>
    | AsyncGenerator<InstanceType<S[P]["responseType"]>>
    : never;
};

/** Gives the methods of a service */
type Methods<S> = {
  [P in keyof SubType<S, Service>]: {
    request: S[P] extends Service ? InstanceType<S[P]["requestType"]> : never;
    response: S[P] extends Service ? InstanceType<S[P]["responseType"]> : never;
  };
};

const AsyncGeneratorFunction = async function* () {}.constructor;

type NamedService = { serviceName: string };

export class PeerServiceServer {
  private base: PeerRPCServer;
  private services = new Map<string, NamedService>();
  private implementations = new WeakMap<NamedService, Implementation<any>>();

  // track any streams that want to be cleaned up
  private stops = new WeakMap<NamedService, (() => void)[]>();

  public addService<T extends NamedService>(
    service: T,
    impl: Implementation<T>,
  ) {
    this.services.set(service.serviceName, service);
    this.implementations.set(service, impl);
    this.stops.set(service, []);
  }

  public removeService(service: NamedService) {
    this.services.delete(service.serviceName);
    this.implementations.delete(service);

    // cancel any streams
    const stops = this.stops.get(service) || [];
    stops.forEach((fn) => fn());
    this.stops.delete(service);
  }

  private async *handleStream(
    meta: Meta,
    payload: Uint8Array,
    stop: () => void,
  ): AsyncGenerator<Uint8Array> {
    const service = this.services.get(meta.serviceName);
    const impl = this.implementations.get(service);

    if (!(service && impl)) {
      console.warn(`Service not found: ${meta.serviceName}`);

      return new Uint8Array([]);
    }

    this.stops.get(service).push(stop);

    const name = meta.fnName;
    const handle = impl[name];

    // Proto Messages
    const Request = service[name].requestType;
    const Response = service[name].responseType;

    const request = Request.deserializeBinary(payload);
    const response = new Response();

    const source = handle(request, response, meta);

    for await (const reply of source as AsyncGenerator) {
      // @ts-ignore
      const u8 = reply.serializeBinary();

      yield u8;
    }
  }
  private async handleUnary(
    meta: Meta,
    payload: Uint8Array,
  ): Promise<Uint8Array> {
    const service = this.services.get(meta.serviceName);
    const impl = this.implementations.get(service);

    if (!(service && impl)) {
      console.warn(`Service not found: ${meta.serviceName}`);

      return new Uint8Array([]);
    }

    const name = meta.fnName;
    const handle = impl[name];

    // Proto Messages
    const Request = service[name].requestType;
    const Response = service[name].responseType;

    const request = Request.deserializeBinary(payload);
    const response = new Response();

    await handle(request, response, meta);

    return response.serializeBinary();
  }

  constructor(room: string, dispatch?: Dispatch) {
    this.base = new PeerRPCServer(
      room,
      {
        stream: this.handleStream.bind(this),
        unary: this.handleUnary.bind(this),
      },
      dispatch,
    );
  }
}

export class PeerServiceClient extends PeerRPCClient {
  constructor(room: string, dispatch?: Dispatch) {
    super(room, dispatch);
  }

  getService<S extends NamedService>(srvc: S) {
    const call = super.call.bind(this);

    return async <T extends keyof Methods<S>>(
      name: T,
      setter?: (p: Methods<S>[T]["request"]) => void | Promise<void>,
    ): Promise<Methods<S>[T]["response"]> => {
      if (!setter) setter = () => {};

      // @ts-ignore
      const Request = srvc[name].requestType;

      const request = new Request();

      await setter(request);

      const service = srvc.serviceName;
      const method = name + "";

      const responseData = await call(
        service,
        method,
        request.serializeBinary(),
      );

      // @ts-ignore
      return new srvc[name].responseType.deserializeBinary(responseData);
    };
  }

  getServiceStream<S extends NamedService>(srvc: S) {
    const callStream = super.callStream.bind(this);

    return async function* <T extends keyof Methods<S>>(
      name: T,
      setter?: (p: Methods<S>[T]["request"]) => void,
    ): AsyncGenerator<Methods<S>[T]["response"]> {
      if (!setter) setter = () => {};

      // @ts-ignore
      const Request = srvc[name].requestType;

      const request = new Request();

      // populate the request
      setter(request);

      const service = srvc.serviceName;
      const method = name + "";

      const u8Stream = callStream(
        service,
        method,
        request.serializeBinary(),
      );

      // @ts-ignore
      const Resp = srvc[name].responseType;

      const reader = u8Stream.getReader() as ReadableStreamDefaultReader;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        // @ts-ignore
        const obj = Resp.deserializeBinary(value);

        yield obj;
      }

      reader.releaseLock();
      u8Stream.cancel();
    };
  }

  /* Not sure if the new one is better yet (issueStream might be handy) */
  async issue<S extends NamedService, T extends keyof Methods<S>>(
    srvc: S,
    name: T,
    setter: (p: Methods<S>[T]["request"]) => void | Promise<void>,
  ): Promise<Methods<S>[T]["response"]> {
    // @ts-ignore
    const Request = srvc[name].requestType;

    const request = new Request();

    await setter(request);

    const service = srvc.serviceName;
    const method = name + "";

    const responseData = await super.call(
      service,
      method,
      request.serializeBinary(),
    );

    // @ts-ignore
    return new srvc[name].responseType.deserializeBinary(responseData);
  }
}
