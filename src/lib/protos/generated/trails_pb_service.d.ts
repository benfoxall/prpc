// package: 
// file: trails.proto

import * as trails_pb from "./trails_pb";
import {grpc} from "@improbable-eng/grpc-web";

type TrailsServiceLine = {
  readonly methodName: string;
  readonly service: typeof TrailsService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof trails_pb.LineRequest;
  readonly responseType: typeof trails_pb.Throttle;
};

type TrailsServiceColor = {
  readonly methodName: string;
  readonly service: typeof TrailsService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof trails_pb.ColorRequest;
  readonly responseType: typeof trails_pb.Noopp;
};

export class TrailsService {
  static readonly serviceName: string;
  static readonly Line: TrailsServiceLine;
  static readonly Color: TrailsServiceColor;
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

export class TrailsServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  line(
    requestMessage: trails_pb.LineRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: trails_pb.Throttle|null) => void
  ): UnaryResponse;
  line(
    requestMessage: trails_pb.LineRequest,
    callback: (error: ServiceError|null, responseMessage: trails_pb.Throttle|null) => void
  ): UnaryResponse;
  color(
    requestMessage: trails_pb.ColorRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: trails_pb.Noopp|null) => void
  ): UnaryResponse;
  color(
    requestMessage: trails_pb.ColorRequest,
    callback: (error: ServiceError|null, responseMessage: trails_pb.Noopp|null) => void
  ): UnaryResponse;
}

