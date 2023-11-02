import axios from "axios";
import React, { useContext } from "react";
import styled from "styled-components";
import { ChatRoomContext } from "../contexts/chatRoomContext";
import { UserContext } from "../contexts/userContext";

const ChatListItem = ({ id, roomName }) => {
  const { user } = useContext(UserContext);
  const { setChatRoom } = useContext(ChatRoomContext);

  const getChatRoom = async () => {
    if (user.token && id) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/chatroom/chatList?roomId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setChatRoom({
          id: id,
          roomName: roomName,
          data: response.data.data,
        });
        console.log(response.data.data);
        console.log(`방 ID: ${id}`);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const onClick = () => {
    getChatRoom();
  };

  return (
    <StyledItem onClick={onClick}>
      <span className="roomname">{roomName}</span>
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
