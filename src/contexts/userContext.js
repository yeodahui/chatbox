// 유저 정보 및 Access Token 관리
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    token: "",
  });

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

  return (
    <UserContext.Provider value={{ user, setUsername, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
