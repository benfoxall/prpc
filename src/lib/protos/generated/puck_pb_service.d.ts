// package: 
// file: puck.proto

import * as puck_pb from "./puck_pb";
import {grpc} from "@improbable-eng/grpc-web";

type PuckServicesetLED = {
  readonly methodName: string;
  readonly service: typeof PuckService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof puck_pb.PuckLED;
  readonly responseType: typeof puck_pb.PuckNoop;
};

type PuckServiceisPressed = {
  readonly methodName: string;
  readonly service: typeof PuckService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof puck_pb.PuckNoop;
  readonly responseType: typeof puck_pb.PuckButton;
};

type PuckServicegetWeather = {
  readonly methodName: string;
  readonly service: typeof PuckService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof puck_pb.PuckNoop;
  readonly responseType: typeof puck_pb.PuckWeather;
};

export class PuckService {
  static readonly serviceName: string;
  static readonly setLED: PuckServicesetLED;
  static readonly isPressed: PuckServiceisPressed;
  static readonly getWeather: PuckServicegetWeather;
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

export class PuckServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  setLED(
    requestMessage: puck_pb.PuckLED,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: puck_pb.PuckNoop|null) => void
  ): UnaryResponse;
  setLED(
    requestMessage: puck_pb.PuckLED,
    callback: (error: ServiceError|null, responseMessage: puck_pb.PuckNoop|null) => void
  ): UnaryResponse;
  isPressed(
    requestMessage: puck_pb.PuckNoop,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: puck_pb.PuckButton|null) => void
  ): UnaryResponse;
  isPressed(
    requestMessage: puck_pb.PuckNoop,
    callback: (error: ServiceError|null, responseMessage: puck_pb.PuckButton|null) => void
  ): UnaryResponse;
  getWeather(
    requestMessage: puck_pb.PuckNoop,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: puck_pb.PuckWeather|null) => void
  ): UnaryResponse;
  getWeather(
    requestMessage: puck_pb.PuckNoop,
    callback: (error: ServiceError|null, responseMessage: puck_pb.PuckWeather|null) => void
  ): UnaryResponse;
}

