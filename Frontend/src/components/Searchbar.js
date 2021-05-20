import React, { useState } from 'react';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  width: 180px;
  position: absolute;
  right: 0;
  top: 207px;
  bottom: 50px;
  z-index: 6;
  display: flex;
  justify-content: flex-end;

  @media (min-width: 1024px) {
    top: 260px;
  }
`;

const Container = styled.div`
  display: ${(props) => (props.extend ? 'flex' : 'none')};
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #b5d5b5;
  opacity: 0.7;
`;
const Search = styled.input.attrs({ type: 'text' })`
  margin: 0 10px;
`;
const SearchLabel = styled.label`
  margin-top: 20px;
  margin-left: 10px;
`;

const Button = styled.button`
  background: #b5d5b5;
  border: none;
  width: 30px;
  z-index: 1;
  display: flex;
  align-items: center;
  color: white;
  font-size: 25px;
`;

export const Searchbar = () => {
  const [extended, setExtended] = useState(false);
  return (
    <Wrapper>
      <Button onClick={() => setExtended(!extended)}>
        {extended ? '▶' : '◀'}
      </Button>
      <Container extend={extended}>
        <SearchLabel htmlFor="Search">Search</SearchLabel>
        <Search id="Search" />
      </Container>
    </Wrapper>
  );
};
