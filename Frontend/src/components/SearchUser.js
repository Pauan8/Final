import React, { useState } from "react";
import styled from "styled-components/macro";
import SearchIcon from "@material-ui/icons/Search";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import { Search } from "./Reusable/Search";

const SearchContainer = styled.div`
  display: flex;

  @media (min-width: 768px){
        margin-top: 10px;
        width: 85vw;
        justify-content: flex-end;
  }

  @media (min-width: 1024px){
    width: 90vw;
    justify-content: flex-end;
  }
`;

const SearchBar = styled.div`
  margin-top: -15px;
  width: ${(props) => (props.expand ? "250px" : "0")};
  overflow: hidden;
  margin-left: 5px;

  @media (min-width: 1024px){
    width: 250px;
  }
`;

const SearchButton = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;

  @media (min-width: 1024px){
    visibility: hidden;
  }
`;

export const SearchUser = ({ mode }) => {
  const [expand, setExpand] = useState(false);

  return (
    <SearchContainer>
    {mode === 'expanded'? <></> :
      <SearchButton onClick={() => setExpand(!expand)}>
        {expand ? <RemoveCircleIcon /> : <SearchIcon />}
      </SearchButton>}
      <SearchBar expand={mode === "expanded" ? true : expand}>
        <Search mode="user" />
      </SearchBar>
    </SearchContainer>
  );
};
