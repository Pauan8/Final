import React, { useState } from "react";
import styled from "styled-components/macro";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import { Search } from "./Reusable/Search";

const SearchContainer = styled.div`
  display: flex;
  width: calc(100vw - 70px) ;
  padding-right: 30px;
  justify-content: flex-end;
  margin-top: 5px;   
`;

const SearchBar = styled.div`
  margin-top: -15px;
  width: ${(props) => (props.expand ? "210px" : "0")};
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

const SearchIcon = styled.img`
    width: 30px;
    height: 30px;`

export const SearchUser = ({ mode }) => {
  const [expand, setExpand] = useState(false);

  return (
    <SearchContainer>
    {mode === 'expanded'? <></> :<>
        <SearchBar expand={mode === "expanded" ? true : expand}>
            <Search mode="user" />
        </SearchBar>
        <SearchButton onClick={() => setExpand(!expand)}>
            {expand ? <RemoveCircleIcon /> : <SearchIcon src={require("../assets/search.png")} />}
        </SearchButton>  </>}
    </SearchContainer>
  );
};
