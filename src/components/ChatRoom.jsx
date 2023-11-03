import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ChatRoomContext } from "../contexts/chatRoomContext";
import { UserContext } from "../contexts/userContext";
import { useWebSocketContext } from "../contexts/webSocketContext";
import { getChatRoom } from "../modules/getChatRoom";
import Bubble from "./Bubble";

const ChatRoom = () => {
  const { chatRoom, setChatRoom } = useContext(ChatRoomContext);
  const { user } = useContext(UserContext);
  const { publish } = useWebSocketContext();
  const [chat, setChat] = useState();
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    setChat(chatRoom.data);
  }, [chatRoom]);

  const isMe = (sender) => {
    return sender === user.username;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("입력됨: " + newMessage);

    // 유효성 검사
    if (newMessage === "") {
      console.log("메시지가 입력되지 않았습니다.");
      return;
    }

    setNewMessage("");

    // 메시지 전송
    const body = {
      type: "TALK",
      roomId: chatRoom.id,
      username: user.username,
      message: newMessage,
    };
    console.log(body);

    try {
      publish("pub/chat/1", body, {
        Authorization: user.token,
      });
      getChatRoom(chatRoom.roomName, user, chatRoom.id, (result) => {
        setChatRoom(result);
      });
    } catch (error) {
      console.log("통신 실패: 메시지 전송에 실패했습니다.");
    }
  };

  return (
    <StyledChatRoom>
      {chat && (
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
      )}
      <form className="cont-input" onSubmit={handleSubmit}>
        <input
          className="input"
          type={"text"}
          placeholder={"메시지 입력 후 Enter"}
          required
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          on
        />
      </form>
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
