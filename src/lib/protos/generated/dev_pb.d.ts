// package: 
// file: dev.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class MoveResponse extends jspb.Message {
  getAnswer(): number;
  setAnswer(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MoveResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MoveResponse): MoveResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MoveResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MoveResponse;
  static deserializeBinaryFromReader(message: MoveResponse, reader: jspb.BinaryReader): MoveResponse;
}

export namespace MoveResponse {
  export type AsObject = {
    answer: number,
  }
}

export class MoveEvent extends jspb.Message {
  getLeft(): number;
  setLeft(value: number): void;

  getTop(): number;
  setTop(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MoveEvent.AsObject;
  static toObject(includeInstance: boolean, msg: MoveEvent): MoveEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MoveEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MoveEvent;
  static deserializeBinaryFromReader(message: MoveEvent, reader: jspb.BinaryReader): MoveEvent;
}

export namespace MoveEvent {
  export type AsObject = {
    left: number,
    top: number,
  }
}

export class Color extends jspb.Message {
  getValue(): string;
  setValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Color.AsObject;
  static toObject(includeInstance: boolean, msg: Color): Color.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Color, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Color;
  static deserializeBinaryFromReader(message: Color, reader: jspb.BinaryReader): Color;
}

export namespace Color {
  export type AsObject = {
    value: string,
  }
}

export class ColorResponse extends jspb.Message {
  getValue(): string;
  setValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ColorResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ColorResponse): ColorResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ColorResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ColorResponse;
  static deserializeBinaryFromReader(message: ColorResponse, reader: jspb.BinaryReader): ColorResponse;
}

export namespace ColorResponse {
  export type AsObject = {
    value: string,
  }
}

export class Emoji extends jspb.Message {
  getChoice(): number;
  setChoice(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Emoji.AsObject;
  static toObject(includeInstance: boolean, msg: Emoji): Emoji.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Emoji, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Emoji;
  static deserializeBinaryFromReader(message: Emoji, reader: jspb.BinaryReader): Emoji;
}

export namespace Emoji {
  export type AsObject = {
    choice: number,
  }
}

