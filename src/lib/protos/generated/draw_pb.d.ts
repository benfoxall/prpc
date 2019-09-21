// package: 
// file: draw.proto

import * as jspb from "google-protobuf";

export class Noopp extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Noopp.AsObject;
  static toObject(includeInstance: boolean, msg: Noopp): Noopp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Noopp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Noopp;
  static deserializeBinaryFromReader(message: Noopp, reader: jspb.BinaryReader): Noopp;
}

export namespace Noopp {
  export type AsObject = {
  }
}

export class LineRequest extends jspb.Message {
  clearCoordsList(): void;
  getCoordsList(): Array<number>;
  setCoordsList(value: Array<number>): void;
  addCoords(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LineRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LineRequest): LineRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LineRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LineRequest;
  static deserializeBinaryFromReader(message: LineRequest, reader: jspb.BinaryReader): LineRequest;
}

export namespace LineRequest {
  export type AsObject = {
    coordsList: Array<number>,
  }
}

export class Throttle extends jspb.Message {
  getTimeout(): number;
  setTimeout(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Throttle.AsObject;
  static toObject(includeInstance: boolean, msg: Throttle): Throttle.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Throttle, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Throttle;
  static deserializeBinaryFromReader(message: Throttle, reader: jspb.BinaryReader): Throttle;
}

export namespace Throttle {
  export type AsObject = {
    timeout: number,
  }
}

export class ColorRequest extends jspb.Message {
  getValue(): string;
  setValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ColorRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ColorRequest): ColorRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ColorRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ColorRequest;
  static deserializeBinaryFromReader(message: ColorRequest, reader: jspb.BinaryReader): ColorRequest;
}

export namespace ColorRequest {
  export type AsObject = {
    value: string,
  }
}

