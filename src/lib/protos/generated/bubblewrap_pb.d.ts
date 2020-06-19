// package: 
// file: bubblewrap.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class Bubble extends jspb.Message {
  getRow(): number;
  setRow(value: number): void;

  getCol(): number;
  setCol(value: number): void;

  getPopped(): boolean;
  setPopped(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Bubble.AsObject;
  static toObject(includeInstance: boolean, msg: Bubble): Bubble.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Bubble, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Bubble;
  static deserializeBinaryFromReader(message: Bubble, reader: jspb.BinaryReader): Bubble;
}

export namespace Bubble {
  export type AsObject = {
    row: number,
    col: number,
    popped: boolean,
  }
}

export class Bubbles extends jspb.Message {
  clearBubblesList(): void;
  getBubblesList(): Array<Bubble>;
  setBubblesList(value: Array<Bubble>): void;
  addBubbles(value?: Bubble, index?: number): Bubble;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Bubbles.AsObject;
  static toObject(includeInstance: boolean, msg: Bubbles): Bubbles.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Bubbles, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Bubbles;
  static deserializeBinaryFromReader(message: Bubbles, reader: jspb.BinaryReader): Bubbles;
}

export namespace Bubbles {
  export type AsObject = {
    bubblesList: Array<Bubble.AsObject>,
  }
}

