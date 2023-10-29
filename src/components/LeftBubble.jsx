import React from "react";
import styled from "styled-components";

const LeftBubble = ({ sender, message, createDate }) => {
  const time = new Date(createDate);
  const timeObj = {
    period: time.getHours() < 12 ? "오전" : "오후",
    hours: time.getHours(),
    minutes: time.getMinutes(),
  };

  return (
    <StyledBubble>
      <p className="name">{sender}</p>
      <div className="content">
        <p className="message">{message}</p>
        <p className="time">{`${timeObj.period} ${timeObj.hours}:${timeObj.minutes}`}</p>
      </div>
    </StyledBubble>
  );
};

const StyledBubble = styled.li`
  .name {
    margin: 5px;
    font-size: 1.2rem;
    font-weight: bold;
  }
  .content {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-end;
    /* flex-direction: row-reverse; */
    width: 100%;

    .message {
      display: inline-block;
      max-width: 70%;
      padding: 10px;
      background-color: #eee;
      /* background-color: dodgerblue;
      color: white; */
      border-radius: 10px;
      font-size: 1.2rem;
      line-height: normal;
      word-wrap: break-word;
    }

    .time {
      display: inline-block;
      margin: 0 5px;
      font-size: 1rem;
      color: #555;
    }
  }
`;

export default LeftBubble;
