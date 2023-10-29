import React from "react";
import styled from "styled-components";

const ChatRoom = () => {
  return (
    <StyledChatRoom>
      <div className="cont-content">채팅</div>
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
  padding: 10px;
  position: relative;
  flex: 2 1 400px;
  display: flex;
  flex-direction: column;

  overflow: hidden;
  background-color: black;
  border-radius: 30px;
  border: 3px solid white;

  .cont-content {
    flex: 1 1 0;
  }

  form {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .input {
    bottom: 0px;
    width: 100%;
    margin: 0;
    padding: 15px;
    border-radius: 20px;
    border: 0;
  }
`;

export default ChatRoom;
