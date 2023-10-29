import React from "react";
import styled from "styled-components";

const ChatListItem = ({ id, roomName, userCount }) => {
  return (
    <StyledItem>
      <span className="roomname">{roomName}</span>
      <span className="usercount">참여자: {userCount}명</span>
    </StyledItem>
  );
};

const StyledItem = styled.li`
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #eee;
  border-radius: 20px;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: #ddd;
  }
  &:active {
    background-color: dodgerblue;
  }

  .roomname {
    font-weight: bold;
  }
  .usercount {
    color: #555;
    font-size: 1rem;
  }
`;

export default ChatListItem;
