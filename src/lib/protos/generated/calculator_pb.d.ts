// package: 
// file: calculator.proto

import * as jspb from "google-protobuf";

export class NumberPair extends jspb.Message {
  getValue1(): number;
  setValue1(value: number): void;

  getValue2(): number;
  setValue2(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NumberPair.AsObject;
  static toObject(includeInstance: boolean, msg: NumberPair): NumberPair.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NumberPair, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NumberPair;
  static deserializeBinaryFromReader(message: NumberPair, reader: jspb.BinaryReader): NumberPair;
}

export namespace NumberPair {
  export type AsObject = {
    value1: number,
    value2: number,
  }
}

export class Result extends jspb.Message {
  getValue(): number;
  setValue(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Result.AsObject;
  static toObject(includeInstance: boolean, msg: Result): Result.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Result, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Result;
  static deserializeBinaryFromReader(message: Result, reader: jspb.BinaryReader): Result;
}

export namespace Result {
  export type AsObject = {
    value: number,
  }
}

