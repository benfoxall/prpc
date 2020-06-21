// package: 
// file: bubble.proto

import * as bubble_pb from "./bubble_pb";
import * as common_pb from "./common_pb";
import {grpc} from "@improbable-eng/grpc-web";

type BubbleServiceGetAll = {
  readonly methodName: string;
  readonly service: typeof BubbleService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof common_pb.Noop;
  readonly responseType: typeof bubble_pb.Bubble;
};

type BubbleServicePop = {
  readonly methodName: string;
  readonly service: typeof BubbleService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof bubble_pb.Bubble;
  readonly responseType: typeof common_pb.Noop;
};

type BubbleServicePopped = {
  readonly methodName: string;
  readonly service: typeof BubbleService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof common_pb.Noop;
  readonly responseType: typeof bubble_pb.Bubble;
};

export class BubbleService {
  static readonly serviceName: string;
  static readonly GetAll: BubbleServiceGetAll;
  static readonly Pop: BubbleServicePop;
  static readonly Popped: BubbleServicePopped;
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
  getAll(requestMessage: common_pb.Noop, metadata?: grpc.Metadata): ResponseStream<bubble_pb.Bubble>;
  pop(
    requestMessage: bubble_pb.Bubble,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: common_pb.Noop|null) => void
  ): UnaryResponse;
  pop(
    requestMessage: bubble_pb.Bubble,
    callback: (error: ServiceError|null, responseMessage: common_pb.Noop|null) => void
  ): UnaryResponse;
  popped(requestMessage: common_pb.Noop, metadata?: grpc.Metadata): ResponseStream<bubble_pb.Bubble>;
}

