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
  max-width: 1000px;
  margin: 0 auto;
  height: 100vh;
  padding: 85px 20px 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;

  & > * {
    max-height: 700px;
    background-color: white;
    border: 3px solid dodgerblue;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    padding: 15px;
  }
`;

export default ChatArea;
