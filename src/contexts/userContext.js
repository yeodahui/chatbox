// 유저 정보 및 Access Token 관리
import { createContext, useState } from "react";

export const UserContext = createContext({
  username: "",
  token: "",
  setUsername: () => {},
  setToken: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const setUsername = (username) => {
    setUser((prev) => ({
      ...prev,
      username: username,
    }));
  };
  const setToken = (token) => {
    setUser((prev) => ({
      ...prev,
      token: token,
    }));
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
