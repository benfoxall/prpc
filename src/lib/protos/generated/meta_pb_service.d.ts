// package: 
// file: meta.proto

import * as meta_pb from "./meta_pb";
import * as common_pb from "./common_pb";
import {grpc} from "@improbable-eng/grpc-web";

type MetagetPage = {
  readonly methodName: string;
  readonly service: typeof Meta;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof common_pb.Noop;
  readonly responseType: typeof meta_pb.Page;
};

type MetagetPageChange = {
  readonly methodName: string;
  readonly service: typeof Meta;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof meta_pb.Page;
  readonly responseType: typeof meta_pb.Page;
};

export class Meta {
  static readonly serviceName: string;
  static readonly getPage: MetagetPage;
  static readonly getPageChange: MetagetPageChange;
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

export class MetaClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getPage(
    requestMessage: common_pb.Noop,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: meta_pb.Page|null) => void
  ): UnaryResponse;
  getPage(
    requestMessage: common_pb.Noop,
    callback: (error: ServiceError|null, responseMessage: meta_pb.Page|null) => void
  ): UnaryResponse;
  getPageChange(
    requestMessage: meta_pb.Page,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: meta_pb.Page|null) => void
  ): UnaryResponse;
  getPageChange(
    requestMessage: meta_pb.Page,
    callback: (error: ServiceError|null, responseMessage: meta_pb.Page|null) => void
  ): UnaryResponse;
}

