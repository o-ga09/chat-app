import { useState } from "react";
import "./App.css";
import { Usecase } from "./lib/usecase/service";
import { SocketioDriver } from "./lib/driver/driver";
import { Message } from "./lib/domain/entity";

function App() {
  const socketioDriver = new SocketioDriver();
  const usecase = new Usecase(socketioDriver);

  const handleClick = () => {
    const message = new Message(
      1,
      "title",
      "user1",
      "user2",
      "test",
      new Date(),
      new Date()
    );
    usecase.SendMessage(message);
  };
  return (
    <>
      <h1>send message test</h1>
      <button onClick={handleClick}>send</button>
    </>
  );
}

export default App;
