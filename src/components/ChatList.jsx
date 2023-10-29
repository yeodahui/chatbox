import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ChatList = () => {
  return (
    <StyledChatRoom>
      <div className="cont-content">채팅목록</div>
    </StyledChatRoom>
  );
};

const StyledChatRoom = styled.div`
  height: 100%;
  padding: 10px;
  position: relative;
  flex: 3 1 600px;
  display: flex;
  flex-direction: column;

  overflow: hidden;
  background-color: black;
  border-radius: 30px;
  border: 3px solid white;
`;

export default ChatList;
