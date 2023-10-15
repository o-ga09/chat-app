import { useEffect, useState } from "react";
import "./App.css";
import { Usecase } from "./lib/usecase/service";
import { SocketioDriver } from "./lib/driver/driver";
import { Message } from "./lib/domain/entity";
import { io } from "socket.io-client";

function App() {
  const url = "http://localhost:8080";
  const socket = io(url);
  const socketioDriver = new SocketioDriver();
  const usecase = new Usecase(socketioDriver);
  const [receiveMessages, setReceiveMessages ] = useState<Message[]>([]);
  const [inputMsg, setInputMsg ] = useState("");

  useEffect(() => {
    socket.on("receive message", function (msg){
      setReceiveMessages((prev) => [...prev,msg])
    });
  },[]);

  const handleClick = () => {
    const message = new Message(
      1,
      "title",
      "user1",
      "user2",
      inputMsg,
      new Date(),
      new Date()
    );
    usecase.SendMessage(message);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMsg(e.target.value);
  };

  return (
    <>
      <h1>send message test</h1>
      <input type="text" id="name" name="name" value={inputMsg} onChange={handleChange}/>
      <button onClick={handleClick}>send</button>
      <div>
        { receiveMessages.map((msg) => (
        <p>{msg.contents}</p>
      )) }</div>
    </>
  );
}

export default App;
