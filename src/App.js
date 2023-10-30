import "./App.css";
import ChatArea from "./components/ChatArea";
import Header from "./components/Header";
import { getUserToken } from "./modules/getUserToken";
import { useEffect } from "react";
import WebSocketComponent from "./modules/WebSocket";

function App() {
  // const socket = useRef();
  useEffect(() => {
    //   const _socket = new WebSocket(WS_URL);
    //   socket.current = _socket;
    //   const stompClient = Stomp.over(socket);
    //   stompClient.connect(
    //     { Authorization: `$Bearer ${getTokenFromLS()}` },
    //     () => {
    //       console.log("connected");
    //     }
    //   );

    if (localStorage.getItem("token") === null) {
      getUserToken();
    } else {
      console.log("토큰이 저장되어있습니다.");
    }
  }, []);
  return (
    <>
      <WebSocketComponent>
        <Header />
        <ChatArea />
      </WebSocketComponent>
    </>
  );
}

export default App;
