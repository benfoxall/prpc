// package: 
// file: cameras.proto

import * as cameras_pb from "./cameras_pb";
import * as common_pb from "./common_pb";
import {grpc} from "@improbable-eng/grpc-web";

type CameraServicePostPhoto = {
  readonly methodName: string;
  readonly service: typeof CameraService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof cameras_pb.Photo;
  readonly responseType: typeof common_pb.Noop;
};

type CameraServiceWait = {
  readonly methodName: string;
  readonly service: typeof CameraService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof common_pb.Noop;
  readonly responseType: typeof cameras_pb.When;
};

export class CameraService {
  static readonly serviceName: string;
  static readonly PostPhoto: CameraServicePostPhoto;
  static readonly Wait: CameraServiceWait;
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

export class CameraServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  postPhoto(
    requestMessage: cameras_pb.Photo,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: common_pb.Noop|null) => void
  ): UnaryResponse;
  postPhoto(
    requestMessage: cameras_pb.Photo,
    callback: (error: ServiceError|null, responseMessage: common_pb.Noop|null) => void
  ): UnaryResponse;
  wait(
    requestMessage: common_pb.Noop,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: cameras_pb.When|null) => void
  ): UnaryResponse;
  wait(
    requestMessage: common_pb.Noop,
    callback: (error: ServiceError|null, responseMessage: cameras_pb.When|null) => void
  ): UnaryResponse;
}

