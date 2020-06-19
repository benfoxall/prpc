// package: 
// file: bubblewrap.proto

import * as bubblewrap_pb from "./bubblewrap_pb";
import * as common_pb from "./common_pb";
import {grpc} from "@improbable-eng/grpc-web";

type BubbleServicePress = {
  readonly methodName: string;
  readonly service: typeof BubbleService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof bubblewrap_pb.Bubble;
  readonly responseType: typeof common_pb.Noop;
};

type BubbleServiceState = {
  readonly methodName: string;
  readonly service: typeof BubbleService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof common_pb.Noop;
  readonly responseType: typeof bubblewrap_pb.Bubbles;
};

type BubbleServiceChanges = {
  readonly methodName: string;
  readonly service: typeof BubbleService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof common_pb.Noop;
  readonly responseType: typeof bubblewrap_pb.Bubble;
};

export class BubbleService {
  static readonly serviceName: string;
  static readonly Press: BubbleServicePress;
  static readonly State: BubbleServiceState;
  static readonly Changes: BubbleServiceChanges;
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

export class BubbleServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  press(
    requestMessage: bubblewrap_pb.Bubble,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: common_pb.Noop|null) => void
  ): UnaryResponse;
  press(
    requestMessage: bubblewrap_pb.Bubble,
    callback: (error: ServiceError|null, responseMessage: common_pb.Noop|null) => void
  ): UnaryResponse;
  state(
    requestMessage: common_pb.Noop,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: bubblewrap_pb.Bubbles|null) => void
  ): UnaryResponse;
  state(
    requestMessage: common_pb.Noop,
    callback: (error: ServiceError|null, responseMessage: bubblewrap_pb.Bubbles|null) => void
  ): UnaryResponse;
  changes(requestMessage: common_pb.Noop, metadata?: grpc.Metadata): ResponseStream<bubblewrap_pb.Bubble>;
}

