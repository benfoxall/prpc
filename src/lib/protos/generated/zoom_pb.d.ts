// package: 
// file: zoom.proto

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

export class EchoMessage extends jspb.Message {
  getText(): string;
  setText(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EchoMessage.AsObject;
  static toObject(includeInstance: boolean, msg: EchoMessage): EchoMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EchoMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EchoMessage;
  static deserializeBinaryFromReader(message: EchoMessage, reader: jspb.BinaryReader): EchoMessage;
}

export namespace EchoMessage {
  export type AsObject = {
    text: string,
  }
}

export class SystemInfo extends jspb.Message {
  clearCpuloadsList(): void;
  getCpuloadsList(): Array<number>;
  setCpuloadsList(value: Array<number>): void;
  addCpuloads(value: number, index?: number): number;

  getBattery(): number;
  setBattery(value: number): void;

  getCharging(): boolean;
  setCharging(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SystemInfo.AsObject;
  static toObject(includeInstance: boolean, msg: SystemInfo): SystemInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SystemInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SystemInfo;
  static deserializeBinaryFromReader(message: SystemInfo, reader: jspb.BinaryReader): SystemInfo;
}

export namespace SystemInfo {
  export type AsObject = {
    cpuloadsList: Array<number>,
    battery: number,
    charging: boolean,
  }
}

export class ColorSchemeRequest extends jspb.Message {
  getScheme(): ColorSchemeRequest.SchemeMap[keyof ColorSchemeRequest.SchemeMap];
  setScheme(value: ColorSchemeRequest.SchemeMap[keyof ColorSchemeRequest.SchemeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ColorSchemeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ColorSchemeRequest): ColorSchemeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ColorSchemeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ColorSchemeRequest;
  static deserializeBinaryFromReader(message: ColorSchemeRequest, reader: jspb.BinaryReader): ColorSchemeRequest;
}

export namespace ColorSchemeRequest {
  export type AsObject = {
    scheme: ColorSchemeRequest.SchemeMap[keyof ColorSchemeRequest.SchemeMap],
  }

  export interface SchemeMap {
    DARK: 0;
    LIGHT: 1;
  }

  export const Scheme: SchemeMap;
}

export class Image extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  getBytes(): Uint8Array | string;
  getBytes_asU8(): Uint8Array;
  getBytes_asB64(): string;
  setBytes(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Image.AsObject;
  static toObject(includeInstance: boolean, msg: Image): Image.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Image, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Image;
  static deserializeBinaryFromReader(message: Image, reader: jspb.BinaryReader): Image;
}

export namespace Image {
  export type AsObject = {
    type: string,
    bytes: Uint8Array | string,
  }
}

