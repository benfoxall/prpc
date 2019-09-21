// package: 
// file: peer-rpc.proto

import * as jspb from "google-protobuf";

export class RPCWrapper extends jspb.Message {
  getPeerid(): string;
  setPeerid(value: string): void;

  getMethodname(): string;
  setMethodname(value: string): void;

  getServicename(): string;
  setServicename(value: string): void;

  getRequestid(): number;
  setRequestid(value: number): void;

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
    peerid: string,
    methodname: string,
    servicename: string,
    requestid: number,
    payload: Uint8Array | string,
  }
}

