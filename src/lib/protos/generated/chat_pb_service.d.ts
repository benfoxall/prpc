// package: 
// file: chat.proto

import * as chat_pb from "./chat_pb";
import * as common_pb from "./common_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ChatServicePostMessage = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof chat_pb.PostMessageRequest;
  readonly responseType: typeof chat_pb.Message;
};

type ChatServicegetMessageList = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof common_pb.Noop;
  readonly responseType: typeof chat_pb.MessageList;
};

type ChatServicenewMessages = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof chat_pb.NewMessageRequest;
  readonly responseType: typeof chat_pb.MessageList;
};

export class ChatService {
  static readonly serviceName: string;
  static readonly PostMessage: ChatServicePostMessage;
  static readonly getMessageList: ChatServicegetMessageList;
  static readonly newMessages: ChatServicenewMessages;
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

export class ChatServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  postMessage(
    requestMessage: chat_pb.PostMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: chat_pb.Message|null) => void
  ): UnaryResponse;
  postMessage(
    requestMessage: chat_pb.PostMessageRequest,
    callback: (error: ServiceError|null, responseMessage: chat_pb.Message|null) => void
  ): UnaryResponse;
  getMessageList(
    requestMessage: common_pb.Noop,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: chat_pb.MessageList|null) => void
  ): UnaryResponse;
  getMessageList(
    requestMessage: common_pb.Noop,
    callback: (error: ServiceError|null, responseMessage: chat_pb.MessageList|null) => void
  ): UnaryResponse;
  newMessages(
    requestMessage: chat_pb.NewMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: chat_pb.MessageList|null) => void
  ): UnaryResponse;
  newMessages(
    requestMessage: chat_pb.NewMessageRequest,
    callback: (error: ServiceError|null, responseMessage: chat_pb.MessageList|null) => void
  ): UnaryResponse;
}

