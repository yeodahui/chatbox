import React from "react";
import styled from "styled-components";

const Header = ({ roomname }) => {
  return (
    <StyledHeader>
      <h2 className="roomname">채팅방 {roomname}</h2>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  padding: 20px;
  position: fixed;
  top: 0;
  background-color: dodgerblue;
  color: white;

  .roomname {
    font-size: 1.6rem;
    font-weight: bold;
  }
`;

export default Header;
