// package: 
// file: puck.proto

import * as jspb from "google-protobuf";

export class PuckNoop extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PuckNoop.AsObject;
  static toObject(includeInstance: boolean, msg: PuckNoop): PuckNoop.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PuckNoop, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PuckNoop;
  static deserializeBinaryFromReader(message: PuckNoop, reader: jspb.BinaryReader): PuckNoop;
}

export namespace PuckNoop {
  export type AsObject = {
  }
}

export class PuckLED extends jspb.Message {
  getColor(): PuckLED.ColorMap[keyof PuckLED.ColorMap];
  setColor(value: PuckLED.ColorMap[keyof PuckLED.ColorMap]): void;

  getOn(): boolean;
  setOn(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PuckLED.AsObject;
  static toObject(includeInstance: boolean, msg: PuckLED): PuckLED.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PuckLED, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PuckLED;
  static deserializeBinaryFromReader(message: PuckLED, reader: jspb.BinaryReader): PuckLED;
}

export namespace PuckLED {
  export type AsObject = {
    color: PuckLED.ColorMap[keyof PuckLED.ColorMap],
    on: boolean,
  }

  export interface ColorMap {
    RED: 0;
    GREEN: 1;
    BLUE: 2;
  }

  export const Color: ColorMap;
}

export class PuckButton extends jspb.Message {
  getPressed(): boolean;
  setPressed(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PuckButton.AsObject;
  static toObject(includeInstance: boolean, msg: PuckButton): PuckButton.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PuckButton, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PuckButton;
  static deserializeBinaryFromReader(message: PuckButton, reader: jspb.BinaryReader): PuckButton;
}

export namespace PuckButton {
  export type AsObject = {
    pressed: boolean,
  }
}

export class PuckWeather extends jspb.Message {
  getTemperature(): number;
  setTemperature(value: number): void;

  getLight(): number;
  setLight(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PuckWeather.AsObject;
  static toObject(includeInstance: boolean, msg: PuckWeather): PuckWeather.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PuckWeather, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PuckWeather;
  static deserializeBinaryFromReader(message: PuckWeather, reader: jspb.BinaryReader): PuckWeather;
}

export namespace PuckWeather {
  export type AsObject = {
    temperature: number,
    light: number,
  }
}

