import { Message } from "../domain/entity";
import { IMessage } from "../usecase/interface/interface";
import { ResponseMsg } from "../usecase/service";
import { io } from 'socket.io-client';

export class SocketioDriver implements IMessage {
    sendMessage(_msg: Message): ResponseMsg {
        const socket = io(); // サーバのURLを指定する
        try {
            socket.emit('chat message', _msg.contents);
            return new ResponseMsg(200,"OK");
        } catch {
            return new ResponseMsg(500, "Error")
        }
    }

    receiveMessage(): Message {
        const socket = io(); // サーバのURLを指定する
        try {
            socket.on('chat message', function(msg) {
                RcvMsg =  new Message(msg.id,msg.title,msg.destName,msg.sourceName,msg.contents,msg.received_at,msg.delivery_at);
            });
        } catch {
            return new Message(0,"","","","",new Date(),new Date);
        }
    }
    
}