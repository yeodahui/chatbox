import "./App.css";
import { useContext, useEffect } from "react";
import { UserContext, UserProvider } from "./contexts/userContext";
import { WebSocketProvider } from "./contexts/webSocketContext";
import { getUserToken } from "./modules/getUserToken";
import ChatArea from "./components/ChatArea";
import Header from "./components/Header";

function App() {
  return (
    <>
      <WebSocketProvider>
        <UserProvider>
          <Auth>
            <Header />
            <ChatArea />
          </Auth>
        </UserProvider>
      </WebSocketProvider>
    </>
  );
}

const Auth = ({ children }) => {
  const { user, setUser } = useContext(UserContext);

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

    setUser({ token, username });
  }, []);

  return <>{children}</>;
};

export default App;
