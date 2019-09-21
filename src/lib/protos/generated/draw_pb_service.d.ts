// package: 
// file: draw.proto

import * as draw_pb from "./draw_pb";
import {grpc} from "@improbable-eng/grpc-web";

type DrawLine = {
  readonly methodName: string;
  readonly service: typeof Draw;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof draw_pb.LineRequest;
  readonly responseType: typeof draw_pb.Throttle;
};

type DrawColor = {
  readonly methodName: string;
  readonly service: typeof Draw;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof draw_pb.ColorRequest;
  readonly responseType: typeof draw_pb.Noopp;
};

export class Draw {
  static readonly serviceName: string;
  static readonly Line: DrawLine;
  static readonly Color: DrawColor;
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

export class DrawClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  line(
    requestMessage: draw_pb.LineRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: draw_pb.Throttle|null) => void
  ): UnaryResponse;
  line(
    requestMessage: draw_pb.LineRequest,
    callback: (error: ServiceError|null, responseMessage: draw_pb.Throttle|null) => void
  ): UnaryResponse;
  color(
    requestMessage: draw_pb.ColorRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: draw_pb.Noopp|null) => void
  ): UnaryResponse;
  color(
    requestMessage: draw_pb.ColorRequest,
    callback: (error: ServiceError|null, responseMessage: draw_pb.Noopp|null) => void
  ): UnaryResponse;
}

