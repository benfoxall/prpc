// package: 
// file: chat.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class SendMessageRequest extends jspb.Message {
  getBody(): string;
  setBody(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendMessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SendMessageRequest): SendMessageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendMessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendMessageRequest;
  static deserializeBinaryFromReader(message: SendMessageRequest, reader: jspb.BinaryReader): SendMessageRequest;
}

export namespace SendMessageRequest {
  export type AsObject = {
    body: string,
  }
}

export class Message extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getBody(): string;
  setBody(value: string): void;

  getAuthor(): string;
  setAuthor(value: string): void;

  getPosttime(): number;
  setPosttime(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    id: number,
    body: string,
    author: string,
    posttime: number,
  }
}

export class MessageList extends jspb.Message {
  clearListList(): void;
  getListList(): Array<Message>;
  setListList(value: Array<Message>): void;
  addList(value?: Message, index?: number): Message;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageList.AsObject;
  static toObject(includeInstance: boolean, msg: MessageList): MessageList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageList;
  static deserializeBinaryFromReader(message: MessageList, reader: jspb.BinaryReader): MessageList;
}

export namespace MessageList {
  export type AsObject = {
    listList: Array<Message.AsObject>,
  }
}

