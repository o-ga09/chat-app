import { Message } from "../domain/entity";
import { IMessage } from "../usecase/interface/interface";
import { ResponseMsg } from "../usecase/service";
import { io } from "socket.io-client";

export class SocketioDriver implements IMessage {
  messages = [];
  url = "http://localhost:8080";
  socket = io(this.url); // サーバのURLを指定する

  sendMessage(_msg: Message): ResponseMsg {
    try {
      this.socket.emit("chat message", _msg.contents);
      return new ResponseMsg(200, "OK");
    } catch {
      return new ResponseMsg(500, "Error");
    }
  }

  receiveMessage() {
    this.socket.on("chat message", function (msg) {
      RcvMsg = new Message(
        msg.id,
        msg.title,
        msg.destName,
        msg.sourceName,
        msg.contents,
        msg.received_at,
        msg.delivery_at
      );
      messages.push(RcvMsg);
    });
  }
}
