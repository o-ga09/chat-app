import { Message } from "../lib/domain/entity";
import { IMessage } from "../lib/usecase/interface/interface";
import { ResponseMsg, Usecase } from "../lib/usecase/service";
import { when } from "jest-when";

describe("ビジネスロジックのテスト", () => {
    test("メッセージの送信", async () => {
        const expected = new ResponseMsg(200,"OK");
        const sendMsg = new Message(1,"title","user1","user2","contents",new Date(),new Date());

        // mock
        const input = {} as IMessage;
        const sendMsgMock = jest.fn();
        input.sendMessage = sendMsgMock;

        // 呼ばれたとき何を返すか定義
        when(sendMsgMock).calledWith(sendMsg).mockResolvedValueOnce(expected);
        
        const usecase = new Usecase(input);
        const actual = await usecase.SendMessage(sendMsg);
        expect(actual).toEqual(expected);
    });

    test("メッセージの受信", async () => {
        const expected = new Message(1,"title","user1","user2","contents",new Date(),new Date());

        // mock
        const input = {} as IMessage;
        const receiveMsgMock = jest.fn();
        input.receiveMessage = receiveMsgMock;

        // 呼ばれたとき何を返すか定義
        when(receiveMsgMock).calledWith().mockResolvedValueOnce(expected);
        
        const usecase = new Usecase(input);
        const actual = await usecase.receiveMessage();
        expect(actual).toEqual(expected);
    });
});