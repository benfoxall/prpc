
import { PeerRPCServer, PeerRPCClient, Meta } from './peerRPC';
import { Dispatch } from 'redux';

type FilterFlags<Base, Condition> = {
  [Key in keyof Base]:
  Base[Key] extends Condition ? Key : never
};
type AllowedNames<Base, Condition> =
  FilterFlags<Base, Condition>[keyof Base];

type SubType<Base, Condition> =
  Pick<Base, AllowedNames<Base, Condition>>;


type Service = {
  readonly requestType: any;
  readonly responseType: any;
}

type Implementation<S> = {
  readonly [P in keyof S]?:
  S[P] extends Service ? (
    request: InstanceType<S[P]["requestType"]>,
    response: InstanceType<S[P]["responseType"]>,
    meta: Meta
  ) => void | Promise<void> : never;
}

/** Gives the methods of a service */
type Methods<S> = {
  [P in keyof SubType<S, Service>]: {
    request: S[P] extends Service ? InstanceType<S[P]["requestType"]> : never;
    response: S[P] extends Service ? InstanceType<S[P]["responseType"]> : never;
  }
}

// type testing = Methods<typeof DemoService>

type NamedService = { serviceName: string };

export class PeerServiceServer extends PeerRPCServer {

  private services = new Map<string, NamedService>();
  private implementations = new WeakMap<NamedService, Implementation<any>>();

  public addService<T extends NamedService>(service: T, impl: Implementation<T>) {
    this.services.set(service.serviceName, service)
    this.implementations.set(service, impl)
  }

  public removeService(service: NamedService) {
    this.services.delete(service.serviceName)
    this.implementations.delete(service)
  }

  constructor(room: string, dispatch?: Dispatch) {
    super(room, (meta, payload) => {

      const service = this.services.get(meta.serviceName);
      const impl = this.implementations.get(service);

      if (!(service && impl)) {
        console.error("Service not found");

        return new Uint8Array([]);
      }

      const name = meta.fnName;

      const handle = impl[name];

      if (handle) {
        const Request = service[name].requestType
        const Response = service[name].responseType

        const request = Request.deserializeBinary(payload)
        const response = new Response()


        return Promise.resolve(handle(request, response, meta))
          .then(() => response.serializeBinary())


      }


      return new Uint8Array([]);
    }, dispatch)
  }
}


export class PeerServiceClient extends PeerRPCClient {

  constructor(room: string, dispatch?: Dispatch) {
    super(room, dispatch);
  }

  async issue<S extends NamedService, T extends keyof Methods<S>>(srvc: S, name: T, setter: (p: Methods<S>[T]['request']) => void | Promise<void>): Promise<Methods<S>[T]['response']> {

    // @ts-ignore
    const Request = srvc[name].requestType

    const request = new Request();

    await setter(request);

    const service = srvc.serviceName;
    const method = name + ''

    const responseData = await super.call(service, method, request.serializeBinary());

    // @ts-ignore
    return new srvc[name].responseType.deserializeBinary(responseData);
  }

}

