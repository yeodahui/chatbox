import React from "react";
import styled from "styled-components";
import ChatRoom from "./ChatRoom";
import ChatList from "./ChatList";

const ChatArea = () => {
  return (
    <StyledArea>
      <ChatRoom />
      <ChatList />
    </StyledArea>
  );
};

const StyledArea = styled.section`
  width: 100%;
  height: 100vh;
  padding: 85px 20px 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

export default ChatArea;
