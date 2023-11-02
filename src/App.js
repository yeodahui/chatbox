import "./App.css";
import { useContext, useEffect } from "react";
import { UserContext, UserProvider } from "./contexts/userContext";
import { getUserToken } from "./modules/getUserToken";
import ChatArea from "./components/ChatArea";
import Header from "./components/Header";

function App() {
  return (
    <>
      <UserProvider>
        <Auth>
          <Header />
          <ChatArea />
        </Auth>
      </UserProvider>
    </>
  );
}

const Auth = ({ children }) => {
  const { setUsername, setToken } = useContext(UserContext);

  useEffect(() => {
    // 세션스토리지에서 token과 username을 불러오고, null이면 전역 상태로 저장
    let token = sessionStorage.getItem("token");
    let username = sessionStorage.getItem("username");

    if (token || username) {
      console.log("토큰이 저장되어있습니다.");
    } else {
      getUserToken();
      console.log("토큰을 불러옵니다.");

      token = sessionStorage.getItem("token");
      username = sessionStorage.getItem("username");
    }

    setToken(token);
    setUsername(username);
  }, []);

  return <>{children}</>;
};

export default App;
