import React from "react";
import styled from "styled-components";
import LeftBubble from "./LeftBubble";
import RightBubble from "./RightBubble";

const ChatRoom = () => {
  const isMe = (username) => {
    return username === "jihyun1";
  };
  const data = [
    {
      sender: "jihyun2",
      message: "jihyun2님이 입장하셨습니다.",
      createDate: "2023-10-29T08:53:23.06258",
    },
    {
      sender: "jihyun1",
      message: "jihyun1님이 입장하셨습니다.",
      createDate: "2023-10-29T08:53:25.471092",
    },
    {
      sender: "jihyun1",
      message: "jihyun1 메시지임!!!!!1 ",
      createDate: "2023-10-29T08:53:49.549486",
    },
    {
      sender: "jihyun2",
      message: "jihyun2 메시지임!!!!! ",
      createDate: "2023-10-29T08:54:25.39632",
    },
  ];

  return (
    <StyledChatRoom>
      <div className="cont-content">
        <ol className="chat-list">
          {data.map(({ sender, message, createDate }) =>
            isMe(sender) ? (
              <RightBubble
                sender={sender}
                message={message}
                createDate={createDate}
              />
            ) : (
              <LeftBubble
                sender={sender}
                message={message}
                createDate={createDate}
              />
            )
          )}
        </ol>
      </div>
      <form className="cont-input">
        <input
          className="input"
          type={"text"}
          placeholder={"메시지 입력 후 Enter"}
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
