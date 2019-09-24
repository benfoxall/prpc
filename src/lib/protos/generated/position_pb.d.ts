// package: 
// file: position.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class Pose extends jspb.Message {
  getMarkerid(): string;
  setMarkerid(value: string): void;

  clearMat3List(): void;
  getMat3List(): Array<number>;
  setMat3List(value: Array<number>): void;
  addMat3(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Pose.AsObject;
  static toObject(includeInstance: boolean, msg: Pose): Pose.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Pose, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Pose;
  static deserializeBinaryFromReader(message: Pose, reader: jspb.BinaryReader): Pose;
}

export namespace Pose {
  export type AsObject = {
    markerid: string,
    mat3List: Array<number>,
  }
}

export class Command extends jspb.Message {
  getAction(): Command.ActionMap[keyof Command.ActionMap];
  setAction(value: Command.ActionMap[keyof Command.ActionMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Command.AsObject;
  static toObject(includeInstance: boolean, msg: Command): Command.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Command, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Command;
  static deserializeBinaryFromReader(message: Command, reader: jspb.BinaryReader): Command;
}

export namespace Command {
  export type AsObject = {
    action: Command.ActionMap[keyof Command.ActionMap],
  }

  export interface ActionMap {
    WAIT: 0;
    DETECT: 1;
  }

  export const Action: ActionMap;
}

