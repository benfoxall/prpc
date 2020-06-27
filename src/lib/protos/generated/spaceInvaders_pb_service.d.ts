// package: 
// file: spaceInvaders.proto

import * as spaceInvaders_pb from "./spaceInvaders_pb";
import {grpc} from "@improbable-eng/grpc-web";

type SpaceServiceMove = {
  readonly methodName: string;
  readonly service: typeof SpaceService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof spaceInvaders_pb.SpaceMessage;
  readonly responseType: typeof spaceInvaders_pb.SpaceNoop;
};

type SpaceServiceFire = {
  readonly methodName: string;
  readonly service: typeof SpaceService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof spaceInvaders_pb.SpaceNoop;
  readonly responseType: typeof spaceInvaders_pb.SpaceNoop;
};

export class SpaceService {
  static readonly serviceName: string;
  static readonly Move: SpaceServiceMove;
  static readonly Fire: SpaceServiceFire;
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

export class SpaceServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  move(
    requestMessage: spaceInvaders_pb.SpaceMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: spaceInvaders_pb.SpaceNoop|null) => void
  ): UnaryResponse;
  move(
    requestMessage: spaceInvaders_pb.SpaceMessage,
    callback: (error: ServiceError|null, responseMessage: spaceInvaders_pb.SpaceNoop|null) => void
  ): UnaryResponse;
  fire(
    requestMessage: spaceInvaders_pb.SpaceNoop,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: spaceInvaders_pb.SpaceNoop|null) => void
  ): UnaryResponse;
  fire(
    requestMessage: spaceInvaders_pb.SpaceNoop,
    callback: (error: ServiceError|null, responseMessage: spaceInvaders_pb.SpaceNoop|null) => void
  ): UnaryResponse;
}

