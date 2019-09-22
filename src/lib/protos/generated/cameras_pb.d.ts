// package: 
// file: cameras.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class Photo extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Photo.AsObject;
  static toObject(includeInstance: boolean, msg: Photo): Photo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Photo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Photo;
  static deserializeBinaryFromReader(message: Photo, reader: jspb.BinaryReader): Photo;
}

export namespace Photo {
  export type AsObject = {
    type: string,
    data: Uint8Array | string,
    id: string,
  }
}

export class When extends jspb.Message {
  getSeconds(): number;
  setSeconds(value: number): void;

  getFacemode(): string;
  setFacemode(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): When.AsObject;
  static toObject(includeInstance: boolean, msg: When): When.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: When, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): When;
  static deserializeBinaryFromReader(message: When, reader: jspb.BinaryReader): When;
}

export namespace When {
  export type AsObject = {
    seconds: number,
    facemode: string,
  }
}

