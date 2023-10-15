import { Message } from "../../domain/entity";
import { ResponseMsg } from "../service";

export interface IMessage {
    sendMessage(msg:Message):ResponseMsg;
    receiveMessage():Message;
}