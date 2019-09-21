
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

export class PeerServiceServer<S extends NamedService> extends PeerRPCServer {
  constructor(room: string, service: S, impl: Implementation<S>, dispatch?: Dispatch) {
    super(room, (meta, payload) => {

      if (meta.serviceName !== service.serviceName) {
        console.error("mismatching service - we're probably screwed");
      }

      const name = meta.fnName;

      const handle = impl[name];

      if (handle) {
        // console.log("handline", meta)
        // handle
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


export class PeerServiceClient<S extends NamedService> extends PeerRPCClient {

  constructor(room: string, private readonly service: S, dispatch?: Dispatch) {
    super(room, dispatch);
  }

  async issue<T extends keyof Methods<S>>(name: T, setter: (p: Methods<S>[T]['request']) => void | Promise<void>): Promise<Methods<S>[T]['response']> {

    // const m = new MoveEvent()
    // m.serializeBinary()

    // MoveEvent.deserializeBinary

    // @ts-ignore
    const Request = this.service[name].requestType

    const request = new Request();

    await setter(request);

    const service = this.service.serviceName;
    const method = name + ''

    const responseData = await super.call(service, method, request.serializeBinary());

    // @ts-ignore
    return new this.service[name].responseType.deserializeBinary(responseData);
  }

}

