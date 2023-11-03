import "./App.css";
import { useContext, useEffect } from "react";
import { UserContext, UserProvider } from "./contexts/userContext";
import {
  useWebSocketContext,
  WebSocketProvider,
} from "./contexts/webSocketContext";
import { getUserToken } from "./modules/getUserToken";
import ChatArea from "./components/ChatArea";
import Header from "./components/Header";
import { ChatListProvider } from "./contexts/chatListContext";

function App() {
  return (
    <>
      <UserProvider>
        <ChatListProvider>
          <WebSocketProvider>
            <Auth>
              <Header />
              <ChatArea />
            </Auth>
          </WebSocketProvider>
        </ChatListProvider>
      </UserProvider>
    </>
  );
}

const Auth = ({ children }) => {
  const { user, setUser } = useContext(UserContext);
  const { connect, disconnect } = useWebSocketContext();

  useEffect(() => {
    // 세션스토리지에서 token과 username을 불러오고, null이면 전역 상태로 저장
    if (user.token || user.username) {
      console.log("토큰이 저장되어있습니다.");
    } else {
      console.log("토큰을 불러옵니다.");
      getUserToken();
    }

    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    // 세션스토리지에서 불러온 username, token을 전역 상태로 저장
    setUser({ token, username });
    // WebSocket 연결(StompJS)
    connect(token);

    return () => {
      // 컴포넌트 언마운트 시 WebSocket 연결 끊기
      disconnect();
    };
  }, []);

  return <>{children}</>;
};

export default App;
