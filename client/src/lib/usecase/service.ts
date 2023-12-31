import { Message } from "../domain/entity";
import { IMessage } from "./interface/interface";

export class Usecase {
  constructor(readonly IMsg: IMessage) {}

  async SendMessage(sendMsg: Message): Promise<ResponseMsg> {
    const res = await this.IMsg.sendMessage(sendMsg);
    return res;
  }

   receiveMessage(): void {
    this.IMsg.receiveMessage();

  }
}

export class ResponseMsg {
  constructor(readonly status: number, readonly resposeMsg: string) {}
}
