import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatListItem from "./ChatListItem";

const ChatList = () => {
  const [chatList, setChatList] = useState([
    {
      id: 9,
      roomName: "채팅방 1",
      userCount: 0,
    },
    {
      id: 10,
      roomName: "채팅방 2",
      userCount: 0,
    },
  ]);
  useEffect(() => {
    // axios.get(`${process.env.REACT_APP_BASE_URL}`);
  }, []);

  return (
    <StyledChatRoomList>
      {/* <h2>현재 참여중인 채팅방 목록</h2> */}
      <ul className="list">
        {chatList.map(({ id, roomName, userCount }) => (
          <ChatListItem id={id} roomName={roomName} userCount={userCount} />
        ))}
      </ul>
    </StyledChatRoomList>
  );
};
const StyledChatRoomList = styled.div`
  height: 100%;
  padding: 20px 10px;
  flex: 3 1 450px;
  border-radius: 30px;

  .list {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export default ChatList;
