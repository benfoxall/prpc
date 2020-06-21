// package: 
// file: clock.proto

import * as clock_pb from "./clock_pb";
import * as common_pb from "./common_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ClockServiceListen = {
  readonly methodName: string;
  readonly service: typeof ClockService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof common_pb.Noop;
  readonly responseType: typeof clock_pb.Tick;
};

export class ClockService {
  static readonly serviceName: string;
  static readonly Listen: ClockServiceListen;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ClockServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  listen(
    requestMessage: common_pb.Noop,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: clock_pb.Tick|null) => void
  ): UnaryResponse;
  listen(
    requestMessage: common_pb.Noop,
    callback: (error: ServiceError|null, responseMessage: clock_pb.Tick|null) => void
  ): UnaryResponse;
}

