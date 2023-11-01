import "./App.css";
import ChatArea from "./components/ChatArea";
import Header from "./components/Header";
import { getUserToken } from "./modules/getUserToken";
import { useEffect } from "react";
import WebSocketComponent from "./modules/WebSocket";
import { UserProvider } from "./contexts/userContext";

function App() {
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      getUserToken();
    } else {
      console.log("토큰이 저장되어있습니다.");
    }
  }, []);

  return (
    <>
      <UserProvider>
        {/* <WebSocketComponent> */}
        <Header />
        <ChatArea />
      </UserProvider>
      {/* </WebSocketComponent> */}
    </>
  );
}

export default App;
