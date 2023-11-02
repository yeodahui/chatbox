import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/userContext";
import ChatListItem from "./ChatListItem";

const ChatList = () => {
  const { user } = useContext(UserContext);
  const [chatList, setChatList] = useState([]);

  const getChatList = async () => {
    if (user.token) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/chatroom/chatRoomList`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(response.data.data);
        setChatList(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getChatList();
  }, [user]);

  return (
    <StyledChatRoomList>
      <ul className="list">
        {chatList &&
          chatList.map(({ id, roomName, userCount }) => (
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
