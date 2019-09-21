// package: 
// file: zoom.proto

import * as zoom_pb from "./zoom_pb";
import {grpc} from "@improbable-eng/grpc-web";

type Zoomecho = {
  readonly methodName: string;
  readonly service: typeof Zoom;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof zoom_pb.EchoMessage;
  readonly responseType: typeof zoom_pb.EchoMessage;
};

type ZoomsystemInfo = {
  readonly methodName: string;
  readonly service: typeof Zoom;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof zoom_pb.Noop;
  readonly responseType: typeof zoom_pb.SystemInfo;
};

type ZoomscreenShot = {
  readonly methodName: string;
  readonly service: typeof Zoom;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof zoom_pb.Noop;
  readonly responseType: typeof zoom_pb.Image;
};

type ZoomsetColorScheme = {
  readonly methodName: string;
  readonly service: typeof Zoom;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof zoom_pb.ColorSchemeRequest;
  readonly responseType: typeof zoom_pb.Noop;
};

export class Zoom {
  static readonly serviceName: string;
  static readonly echo: Zoomecho;
  static readonly systemInfo: ZoomsystemInfo;
  static readonly screenShot: ZoomscreenShot;
  static readonly setColorScheme: ZoomsetColorScheme;
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

export class ZoomClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  echo(
    requestMessage: zoom_pb.EchoMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: zoom_pb.EchoMessage|null) => void
  ): UnaryResponse;
  echo(
    requestMessage: zoom_pb.EchoMessage,
    callback: (error: ServiceError|null, responseMessage: zoom_pb.EchoMessage|null) => void
  ): UnaryResponse;
  systemInfo(requestMessage: zoom_pb.Noop, metadata?: grpc.Metadata): ResponseStream<zoom_pb.SystemInfo>;
  screenShot(
    requestMessage: zoom_pb.Noop,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: zoom_pb.Image|null) => void
  ): UnaryResponse;
  screenShot(
    requestMessage: zoom_pb.Noop,
    callback: (error: ServiceError|null, responseMessage: zoom_pb.Image|null) => void
  ): UnaryResponse;
  setColorScheme(
    requestMessage: zoom_pb.ColorSchemeRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: zoom_pb.Noop|null) => void
  ): UnaryResponse;
  setColorScheme(
    requestMessage: zoom_pb.ColorSchemeRequest,
    callback: (error: ServiceError|null, responseMessage: zoom_pb.Noop|null) => void
  ): UnaryResponse;
}

