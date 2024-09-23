// package: 
// file: opfs.proto

import * as opfs_pb from "./opfs_pb";
import * as common_pb from "./common_pb";
import {grpc} from "@improbable-eng/grpc-web";

type OpfsServiceList = {
  readonly methodName: string;
  readonly service: typeof OpfsService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof common_pb.Noop;
  readonly responseType: typeof opfs_pb.FileEntry;
};

type OpfsServiceFetch = {
  readonly methodName: string;
  readonly service: typeof OpfsService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof opfs_pb.FileRequest;
  readonly responseType: typeof opfs_pb.FileTransfer;
};

export class OpfsService {
  static readonly serviceName: string;
  static readonly List: OpfsServiceList;
  static readonly Fetch: OpfsServiceFetch;
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

export class OpfsServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  list(requestMessage: common_pb.Noop, metadata?: grpc.Metadata): ResponseStream<opfs_pb.FileEntry>;
  fetch(requestMessage: opfs_pb.FileRequest, metadata?: grpc.Metadata): ResponseStream<opfs_pb.FileTransfer>;
}

