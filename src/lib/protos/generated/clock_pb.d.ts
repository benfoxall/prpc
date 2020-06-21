// package: 
// file: clock.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class Tick extends jspb.Message {
  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Tick.AsObject;
  static toObject(includeInstance: boolean, msg: Tick): Tick.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Tick, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Tick;
  static deserializeBinaryFromReader(message: Tick, reader: jspb.BinaryReader): Tick;
}

export namespace Tick {
  export type AsObject = {
    count: number,
  }
}

