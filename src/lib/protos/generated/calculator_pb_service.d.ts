// package: 
// file: calculator.proto

import * as calculator_pb from "./calculator_pb";
import {grpc} from "@improbable-eng/grpc-web";

type CalculatorServiceCalculate = {
  readonly methodName: string;
  readonly service: typeof CalculatorService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof calculator_pb.NumberPair;
  readonly responseType: typeof calculator_pb.Result;
};

export class CalculatorService {
  static readonly serviceName: string;
  static readonly Calculate: CalculatorServiceCalculate;
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

export class CalculatorServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  calculate(
    requestMessage: calculator_pb.NumberPair,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: calculator_pb.Result|null) => void
  ): UnaryResponse;
  calculate(
    requestMessage: calculator_pb.NumberPair,
    callback: (error: ServiceError|null, responseMessage: calculator_pb.Result|null) => void
  ): UnaryResponse;
}

