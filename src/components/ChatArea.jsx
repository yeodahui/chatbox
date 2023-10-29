import React from "react";
import styled from "styled-components";
import Chatroom from "./ChatRoom";

const ChatArea = () => {
  return (
    <StyledArea>
      <Chatroom />
      <Chatroom />
    </StyledArea>
  );
};

const StyledArea = styled.section`
  width: 100%;
  height: 100vh;
  padding: 85px 20px 20px;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

export default ChatArea;
