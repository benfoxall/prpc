// package: 
// file: content.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class ContentWait extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContentWait.AsObject;
  static toObject(includeInstance: boolean, msg: ContentWait): ContentWait.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContentWait, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContentWait;
  static deserializeBinaryFromReader(message: ContentWait, reader: jspb.BinaryReader): ContentWait;
}

export namespace ContentWait {
  export type AsObject = {
    id: number,
  }
}

export class Content extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getBody(): string;
  setBody(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Content.AsObject;
  static toObject(includeInstance: boolean, msg: Content): Content.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Content, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Content;
  static deserializeBinaryFromReader(message: Content, reader: jspb.BinaryReader): Content;
}

export namespace Content {
  export type AsObject = {
    id: number,
    body: string,
  }
}

