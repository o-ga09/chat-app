import { useEffect, useState } from "react";
import "./App.css";
import { Usecase } from "./lib/usecase/service";
import { SocketioDriver } from "./lib/driver/driver";
import { Message } from "./lib/domain/entity";
import { io } from "socket.io-client";
import { BiSolidUser } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";
import { Flex, Box } from "@chakra-ui/react";

function App() {
  const url = "https://chat-api-y7xk6pfxra-uw.a.run.app";
  const socket = io(url);
  const socketioDriver = new SocketioDriver();
  const usecase = new Usecase(socketioDriver);
  const [receiveMessages, setReceiveMessages] = useState<Message[]>([]);
  const [inputMsg, setInputMsg] = useState("");
  const [userName, setUserName] = useState("");
  const [hasUserName, setHasUserName] = useState(false);

  useEffect(() => {
    socket.on("receive message", function (msg) {
      setReceiveMessages((prev) => [...prev, msg]);
    });
  }, []);

  const handleClick = () => {
    if (inputMsg === "") return;
    const message = new Message(
      1,
      "title",
      "user1",
      userName,
      inputMsg,
      new Date(),
      new Date()
    );
    usecase.SendMessage(message);
    setInputMsg("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMsg(e.target.value);
  };

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const submitName = () => {
    if (userName === "") return;
    setHasUserName(true);
  };

  return (
    <>
      <h1>send message test</h1>

      {hasUserName ? (
        <></>
      ) : (
        <Box>
          <input placeholder="username" onChange={handleUserName}></input>
          <button onClick={submitName}>submit</button>
        </Box>
      )}

      <Flex flexDirection={"column"}>
        {receiveMessages.map((msg) => (
          <>
            {msg.sourceName === userName ? (
              <Flex alignItems={"center"} justifyContent={"flex-end"}>
                <BiSolidUser size="2rem" style={{ paddingBottom: "1rem" }} />
                <Box m={"0.5em 0"}>
                  <Box
                    border={"solid 1px rgb(0, 122, 255)"}
                    borderRadius={"10px"}
                    p={"0.25em 1em"}
                    background={"rgb(0, 122, 255)"}
                    color={"white"}
                    boxShadow={
                      "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px"
                    }
                    m={"0.25em"}
                  >
                    {msg.contents}
                  </Box>
                  <Box fontSize={"0.75em"} textAlign={"left"}>
                    {new Date(msg.delivery_at).getHours()}:
                    {new Date(msg.delivery_at).getMinutes()}
                  </Box>
                </Box>
              </Flex>
            ) : (
              <Flex alignItems={"center"} justifyContent={"flex-start"}>
                <BiSolidUser size="2rem" style={{ paddingBottom: "1rem" }} />
                <Box m={"0.5em 0"}>
                  <Box
                    border={"solid 1px #000"}
                    borderRadius={"10px"}
                    p={"0.25em 1em"}
                    background={"#fff"}
                    color={"#000"}
                    boxShadow={
                      "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px"
                    }
                    m={"0.25em"}
                  >
                    {msg.contents}
                  </Box>
                  <Box fontSize={"0.75em"} textAlign={"left"}>
                    {new Date(msg.delivery_at).getHours()}:
                    {new Date(msg.delivery_at).getMinutes()}
                  </Box>
                </Box>
              </Flex>
            )}
          </>
        ))}
      </Flex>
      <Box
        position={"fixed"}
        width={"100vw"}
        padding={"5px"}
        bottom={0}
        m={"auto"}
        left={0}
        right={0}
        background={"#fff"}
      >
        <input
          type="text"
          id="name"
          name="name"
          value={inputMsg}
          onChange={handleChange}
          placeholder="Please enter something"
          style={{
            padding: "0.5em 2em",
            marginRight: "1em",
          }}
        />
        <button
          style={{
            background: "rgb(0, 122, 255)",
            color: "#fff",
          }}
          onClick={handleClick}
        >
          <AiOutlineSend />
          <span
            style={{
              display: "inline-block",
              marginLeft: "0.5em",
              position: "relative",
              top: "-0.15em",
            }}
          >
            send
          </span>
        </button>
      </Box>
    </>
  );
}

export default App;
