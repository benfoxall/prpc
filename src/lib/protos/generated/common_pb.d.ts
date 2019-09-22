// package: 
// file: common.proto

import * as jspb from "google-protobuf";

export class Noop extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Noop.AsObject;
  static toObject(includeInstance: boolean, msg: Noop): Noop.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Noop, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Noop;
  static deserializeBinaryFromReader(message: Noop, reader: jspb.BinaryReader): Noop;
}

export namespace Noop {
  export type AsObject = {
  }
}

