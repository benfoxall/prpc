// package: 
// file: calculator.proto

import * as calculator_pb from "./calculator_pb";
import {grpc} from "@improbable-eng/grpc-web";

type CalculatorAdd = {
  readonly methodName: string;
  readonly service: typeof Calculator;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof calculator_pb.Request;
  readonly responseType: typeof calculator_pb.Response;
};

type CalculatorMultiply = {
  readonly methodName: string;
  readonly service: typeof Calculator;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof calculator_pb.Request;
  readonly responseType: typeof calculator_pb.Response;
};

type CalculatorDivide = {
  readonly methodName: string;
  readonly service: typeof Calculator;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof calculator_pb.Request;
  readonly responseType: typeof calculator_pb.Response;
};

export class Calculator {
  static readonly serviceName: string;
  static readonly Add: CalculatorAdd;
  static readonly Multiply: CalculatorMultiply;
  static readonly Divide: CalculatorDivide;
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

export class CalculatorClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  add(
    requestMessage: calculator_pb.Request,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: calculator_pb.Response|null) => void
  ): UnaryResponse;
  add(
    requestMessage: calculator_pb.Request,
    callback: (error: ServiceError|null, responseMessage: calculator_pb.Response|null) => void
  ): UnaryResponse;
  multiply(
    requestMessage: calculator_pb.Request,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: calculator_pb.Response|null) => void
  ): UnaryResponse;
  multiply(
    requestMessage: calculator_pb.Request,
    callback: (error: ServiceError|null, responseMessage: calculator_pb.Response|null) => void
  ): UnaryResponse;
  divide(
    requestMessage: calculator_pb.Request,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: calculator_pb.Response|null) => void
  ): UnaryResponse;
  divide(
    requestMessage: calculator_pb.Request,
    callback: (error: ServiceError|null, responseMessage: calculator_pb.Response|null) => void
  ): UnaryResponse;
}

