// package: 
// file: dev.proto

import * as dev_pb from "./dev_pb";
import {grpc} from "@improbable-eng/grpc-web";

type DevMouseMove = {
  readonly methodName: string;
  readonly service: typeof Dev;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof dev_pb.MoveEvent;
  readonly responseType: typeof dev_pb.MoveResponse;
};

type DevBackground = {
  readonly methodName: string;
  readonly service: typeof Dev;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof dev_pb.Color;
  readonly responseType: typeof dev_pb.ColorResponse;
};

export class Dev {
  static readonly serviceName: string;
  static readonly MouseMove: DevMouseMove;
  static readonly Background: DevBackground;
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

export class DevClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  mouseMove(
    requestMessage: dev_pb.MoveEvent,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: dev_pb.MoveResponse|null) => void
  ): UnaryResponse;
  mouseMove(
    requestMessage: dev_pb.MoveEvent,
    callback: (error: ServiceError|null, responseMessage: dev_pb.MoveResponse|null) => void
  ): UnaryResponse;
  background(
    requestMessage: dev_pb.Color,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: dev_pb.ColorResponse|null) => void
  ): UnaryResponse;
  background(
    requestMessage: dev_pb.Color,
    callback: (error: ServiceError|null, responseMessage: dev_pb.ColorResponse|null) => void
  ): UnaryResponse;
}

