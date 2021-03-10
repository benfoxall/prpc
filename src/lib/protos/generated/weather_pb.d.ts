// package: 
// file: weather.proto

import * as jspb from "google-protobuf";

export class WeatherResponse extends jspb.Message {
  getPlacename(): string;
  setPlacename(value: string): void;

  getCloudy(): boolean;
  setCloudy(value: boolean): void;

  getTemprature(): number;
  setTemprature(value: number): void;

  getWindSpeed(): number;
  setWindSpeed(value: number): void;

  getWindDirection(): number;
  setWindDirection(value: number): void;

  getPhoto(): Uint8Array | string;
  getPhoto_asU8(): Uint8Array;
  getPhoto_asB64(): string;
  setPhoto(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WeatherResponse.AsObject;
  static toObject(includeInstance: boolean, msg: WeatherResponse): WeatherResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WeatherResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WeatherResponse;
  static deserializeBinaryFromReader(message: WeatherResponse, reader: jspb.BinaryReader): WeatherResponse;
}

export namespace WeatherResponse {
  export type AsObject = {
    placename: string,
    cloudy: boolean,
    temprature: number,
    windSpeed: number,
    windDirection: number,
    photo: Uint8Array | string,
  }
}

export class WeatherRequest extends jspb.Message {
  getQuery(): string;
  setQuery(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WeatherRequest.AsObject;
  static toObject(includeInstance: boolean, msg: WeatherRequest): WeatherRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WeatherRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WeatherRequest;
  static deserializeBinaryFromReader(message: WeatherRequest, reader: jspb.BinaryReader): WeatherRequest;
}

export namespace WeatherRequest {
  export type AsObject = {
    query: string,
  }
}

