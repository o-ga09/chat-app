import { Message } from "../domain/entity";
import { IMessage } from "../usecase/interface/interface";
import { ResponseMsg } from "../usecase/service";
import { io } from "socket.io-client";

export class SocketioDriver implements IMessage {
  messages = [] as Message[];
  url = "https://chat-api-y7xk6pfxra-uw.a.run.app";
  socket = io(this.url); // サーバのURLを指定する
  
  sendMessage(_msg: Message): ResponseMsg {
    try {
      this.socket.emit("send message", _msg);
      return new ResponseMsg(200, "OK");
    } catch {
      return new ResponseMsg(500, "Error");
    }
  }
  
  receiveMessage(): void {
    throw new Error("Method not implemented.");
  }
}
