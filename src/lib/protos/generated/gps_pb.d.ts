// package: 
// file: gps.proto

import * as jspb from "google-protobuf";

export class GeolocationCoordinates extends jspb.Message {
  getLatitude(): number;
  setLatitude(value: number): void;

  getLongitude(): number;
  setLongitude(value: number): void;

  getAltitude(): number;
  setAltitude(value: number): void;

  getAccuracy(): number;
  setAccuracy(value: number): void;

  getAltitudeaccuracy(): number;
  setAltitudeaccuracy(value: number): void;

  getHeading(): number;
  setHeading(value: number): void;

  getSpeed(): number;
  setSpeed(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GeolocationCoordinates.AsObject;
  static toObject(includeInstance: boolean, msg: GeolocationCoordinates): GeolocationCoordinates.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GeolocationCoordinates, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GeolocationCoordinates;
  static deserializeBinaryFromReader(message: GeolocationCoordinates, reader: jspb.BinaryReader): GeolocationCoordinates;
}

export namespace GeolocationCoordinates {
  export type AsObject = {
    latitude: number,
    longitude: number,
    altitude: number,
    accuracy: number,
    altitudeaccuracy: number,
    heading: number,
    speed: number,
  }
}

export class GeoNoop extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GeoNoop.AsObject;
  static toObject(includeInstance: boolean, msg: GeoNoop): GeoNoop.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GeoNoop, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GeoNoop;
  static deserializeBinaryFromReader(message: GeoNoop, reader: jspb.BinaryReader): GeoNoop;
}

export namespace GeoNoop {
  export type AsObject = {
  }
}

