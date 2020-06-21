// package: 
// file: bubble.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class Bubble extends jspb.Message {
  getCol(): number;
  setCol(value: number): void;

  getRow(): number;
  setRow(value: number): void;

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
    col: number,
    row: number,
  }
}

export class BubbleList extends jspb.Message {
  clearBubblesList(): void;
  getBubblesList(): Array<Bubble>;
  setBubblesList(value: Array<Bubble>): void;
  addBubbles(value?: Bubble, index?: number): Bubble;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BubbleList.AsObject;
  static toObject(includeInstance: boolean, msg: BubbleList): BubbleList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BubbleList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BubbleList;
  static deserializeBinaryFromReader(message: BubbleList, reader: jspb.BinaryReader): BubbleList;
}

export namespace BubbleList {
  export type AsObject = {
    bubblesList: Array<Bubble.AsObject>,
  }
}

