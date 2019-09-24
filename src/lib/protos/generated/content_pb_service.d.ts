// package: 
// file: content.proto

import * as content_pb from "./content_pb";
import * as common_pb from "./common_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ContentServiceWait = {
  readonly methodName: string;
  readonly service: typeof ContentService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof content_pb.ContentWait;
  readonly responseType: typeof content_pb.Content;
};

type ContentServiceGetContent = {
  readonly methodName: string;
  readonly service: typeof ContentService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof common_pb.Noop;
  readonly responseType: typeof content_pb.Content;
};

export class ContentService {
  static readonly serviceName: string;
  static readonly Wait: ContentServiceWait;
  static readonly GetContent: ContentServiceGetContent;
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

export class ContentServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  wait(
    requestMessage: content_pb.ContentWait,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: content_pb.Content|null) => void
  ): UnaryResponse;
  wait(
    requestMessage: content_pb.ContentWait,
    callback: (error: ServiceError|null, responseMessage: content_pb.Content|null) => void
  ): UnaryResponse;
  getContent(
    requestMessage: common_pb.Noop,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: content_pb.Content|null) => void
  ): UnaryResponse;
  getContent(
    requestMessage: common_pb.Noop,
    callback: (error: ServiceError|null, responseMessage: content_pb.Content|null) => void
  ): UnaryResponse;
}

