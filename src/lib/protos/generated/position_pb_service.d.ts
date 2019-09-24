// package: 
// file: position.proto

import * as position_pb from "./position_pb";
import * as common_pb from "./common_pb";
import {grpc} from "@improbable-eng/grpc-web";

type PositionServiceWait = {
  readonly methodName: string;
  readonly service: typeof PositionService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof common_pb.Noop;
  readonly responseType: typeof position_pb.Command;
};

type PositionServiceSendPose = {
  readonly methodName: string;
  readonly service: typeof PositionService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof position_pb.Pose;
  readonly responseType: typeof common_pb.Noop;
};

export class PositionService {
  static readonly serviceName: string;
  static readonly Wait: PositionServiceWait;
  static readonly SendPose: PositionServiceSendPose;
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

export class PositionServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  wait(
    requestMessage: common_pb.Noop,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: position_pb.Command|null) => void
  ): UnaryResponse;
  wait(
    requestMessage: common_pb.Noop,
    callback: (error: ServiceError|null, responseMessage: position_pb.Command|null) => void
  ): UnaryResponse;
  sendPose(
    requestMessage: position_pb.Pose,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: common_pb.Noop|null) => void
  ): UnaryResponse;
  sendPose(
    requestMessage: position_pb.Pose,
    callback: (error: ServiceError|null, responseMessage: common_pb.Noop|null) => void
  ): UnaryResponse;
}

