// package: 
// file: spaceInvaders.proto

import * as jspb from "google-protobuf";

export class SpaceMessage extends jspb.Message {
  getDirection(): number;
  setDirection(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SpaceMessage.AsObject;
  static toObject(includeInstance: boolean, msg: SpaceMessage): SpaceMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SpaceMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SpaceMessage;
  static deserializeBinaryFromReader(message: SpaceMessage, reader: jspb.BinaryReader): SpaceMessage;
}

export namespace SpaceMessage {
  export type AsObject = {
    direction: number,
  }
}

export class SpaceNoop extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SpaceNoop.AsObject;
  static toObject(includeInstance: boolean, msg: SpaceNoop): SpaceNoop.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SpaceNoop, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SpaceNoop;
  static deserializeBinaryFromReader(message: SpaceNoop, reader: jspb.BinaryReader): SpaceNoop;
}

export namespace SpaceNoop {
  export type AsObject = {
  }
}

