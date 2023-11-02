import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ChatRoomContext } from "../contexts/chatRoomContext";
import { UserContext } from "../contexts/userContext";
import Bubble from "./Bubble";

const ChatRoom = () => {
  const { chatRoom } = useContext(ChatRoomContext);
  const { user } = useContext(UserContext);
  const [chat, setChat] = useState();

  useEffect(() => {
    setChat(chatRoom.data);
  }, [chatRoom]);

  const isMe = (sender) => {
    return sender === user.username;
  };

  return (
    <StyledChatRoom>
      {chat && (
        <>
          <div className="cont-content">
            <ol className="chat-list">
              {chat.map(({ sender, message, createDate }) => (
                <Bubble
                  isMe={isMe(sender)}
                  sender={sender}
                  message={message}
                  createDate={createDate}
                />
              ))}
            </ol>
          </div>
          <form className="cont-input">
            <input
              className="input"
              type={"text"}
              placeholder={"메시지 입력 후 Enter"}
            />
          </form>
        </>
      )}
    </StyledChatRoom>
  );
};

const StyledChatRoom = styled.div`
  height: 100%;
  position: relative;
  flex: 2 1 300px;
  display: flex;
  flex-direction: column;

  overflow: hidden;
  border-radius: 20px;

  .cont-content {
    padding: 10px 5px 0;
    flex: 1 1 0;
    overflow-y: auto;

    .chat-list {
      width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      li {
        margin-bottom: 20px;
      }
    }
  }

  form {
    width: 100%;
    margin: 10px 0 0;
    padding: 0;
  }
  .input {
    bottom: 0px;
    width: 100%;
    margin: 0;
    padding: 15px;
    border-radius: 20px;
    border: 0;
    background-color: #eee;
    font-size: inherit;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #ddd;
    }
  }
`;

export default ChatRoom;
