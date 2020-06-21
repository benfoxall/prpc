// package: 
// file: peer-rpc.proto

import * as jspb from "google-protobuf";

export class RPCWrapper extends jspb.Message {
  getMethodname(): string;
  setMethodname(value: string): void;

  getServicename(): string;
  setServicename(value: string): void;

  getIsstream(): boolean;
  setIsstream(value: boolean): void;

  getRequestid(): number;
  setRequestid(value: number): void;

  getDone(): boolean;
  setDone(value: boolean): void;

  getPayload(): Uint8Array | string;
  getPayload_asU8(): Uint8Array;
  getPayload_asB64(): string;
  setPayload(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RPCWrapper.AsObject;
  static toObject(includeInstance: boolean, msg: RPCWrapper): RPCWrapper.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RPCWrapper, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RPCWrapper;
  static deserializeBinaryFromReader(message: RPCWrapper, reader: jspb.BinaryReader): RPCWrapper;
}

export namespace RPCWrapper {
  export type AsObject = {
    methodname: string,
    servicename: string,
    isstream: boolean,
    requestid: number,
    done: boolean,
    payload: Uint8Array | string,
  }
}

export class PRPCStreamChunk extends jspb.Message {
  getMeta(): string;
  setMeta(value: string): void;

  getId(): number;
  setId(value: number): void;

  getDone(): boolean;
  setDone(value: boolean): void;

  getPayload(): Uint8Array | string;
  getPayload_asU8(): Uint8Array;
  getPayload_asB64(): string;
  setPayload(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PRPCStreamChunk.AsObject;
  static toObject(includeInstance: boolean, msg: PRPCStreamChunk): PRPCStreamChunk.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PRPCStreamChunk, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PRPCStreamChunk;
  static deserializeBinaryFromReader(message: PRPCStreamChunk, reader: jspb.BinaryReader): PRPCStreamChunk;
}

export namespace PRPCStreamChunk {
  export type AsObject = {
    meta: string,
    id: number,
    done: boolean,
    payload: Uint8Array | string,
  }
}

