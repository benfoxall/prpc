// package: 
// file: opfs.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class FileList extends jspb.Message {
  clearEntriesList(): void;
  getEntriesList(): Array<FileEntry>;
  setEntriesList(value: Array<FileEntry>): void;
  addEntries(value?: FileEntry, index?: number): FileEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileList.AsObject;
  static toObject(includeInstance: boolean, msg: FileList): FileList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FileList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileList;
  static deserializeBinaryFromReader(message: FileList, reader: jspb.BinaryReader): FileList;
}

export namespace FileList {
  export type AsObject = {
    entriesList: Array<FileEntry.AsObject>,
  }
}

export class FileEntry extends jspb.Message {
  getFilename(): string;
  setFilename(value: string): void;

  getSize(): number;
  setSize(value: number): void;

  getModified(): number;
  setModified(value: number): void;

  getType(): string;
  setType(value: string): void;

  getDeleted(): boolean;
  setDeleted(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileEntry.AsObject;
  static toObject(includeInstance: boolean, msg: FileEntry): FileEntry.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FileEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileEntry;
  static deserializeBinaryFromReader(message: FileEntry, reader: jspb.BinaryReader): FileEntry;
}

export namespace FileEntry {
  export type AsObject = {
    filename: string,
    size: number,
    modified: number,
    type: string,
    deleted: boolean,
  }
}

export class FileRequest extends jspb.Message {
  getFilename(): string;
  setFilename(value: string): void;

  getTransform(): string;
  setTransform(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FileRequest): FileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileRequest;
  static deserializeBinaryFromReader(message: FileRequest, reader: jspb.BinaryReader): FileRequest;
}

export namespace FileRequest {
  export type AsObject = {
    filename: string,
    transform: string,
  }
}

export class FileTransfer extends jspb.Message {
  getContent(): Uint8Array | string;
  getContent_asU8(): Uint8Array;
  getContent_asB64(): string;
  setContent(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileTransfer.AsObject;
  static toObject(includeInstance: boolean, msg: FileTransfer): FileTransfer.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FileTransfer, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileTransfer;
  static deserializeBinaryFromReader(message: FileTransfer, reader: jspb.BinaryReader): FileTransfer;
}

export namespace FileTransfer {
  export type AsObject = {
    content: Uint8Array | string,
  }
}

export class EscapeMessage extends jspb.Message {
  getBody(): string;
  setBody(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EscapeMessage.AsObject;
  static toObject(includeInstance: boolean, msg: EscapeMessage): EscapeMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EscapeMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EscapeMessage;
  static deserializeBinaryFromReader(message: EscapeMessage, reader: jspb.BinaryReader): EscapeMessage;
}

export namespace EscapeMessage {
  export type AsObject = {
    body: string,
  }
}

