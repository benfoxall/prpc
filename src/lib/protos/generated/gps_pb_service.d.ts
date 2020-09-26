// package: 
// file: gps.proto

import * as gps_pb from "./gps_pb";
import {grpc} from "@improbable-eng/grpc-web";

type GPSquery = {
  readonly methodName: string;
  readonly service: typeof GPS;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof gps_pb.GeoNoop;
  readonly responseType: typeof gps_pb.GeolocationCoordinates;
};

export class GPS {
  static readonly serviceName: string;
  static readonly query: GPSquery;
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

export class GPSClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  query(
    requestMessage: gps_pb.GeoNoop,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: gps_pb.GeolocationCoordinates|null) => void
  ): UnaryResponse;
  query(
    requestMessage: gps_pb.GeoNoop,
    callback: (error: ServiceError|null, responseMessage: gps_pb.GeolocationCoordinates|null) => void
  ): UnaryResponse;
}

