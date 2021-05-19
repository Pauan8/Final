import React from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.div`
  position: relative;
  height: 207px;
  z-index: 3;
  background: lightgray;
`;

const BgImage = styled.div`
  position: absolute;
  height: 207px;
  width: 100%;
  background-image: url(${(props) => props.path});
  background-attachment: fixed;
  background-size: cover;
  background-position-y: top;
  opacity: 0.3;
  z-index: -1;
`;

const TextContainer = styled.div`
  position: absolute;
  height: 207px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10%;
`;

const Title = styled.h1`
  margin: 0%;
  font-family: "Rock Salt", cursive;
  color: white;
  text-shadow: 2px 2px darkslategrey;
`;

const SubTitle = styled.h2`
  margin: 0%;
  font-family: "Raleway", sans-serif;
  color: darkslategrey;
`;

export const Header = () => {
  return (
    <Wrapper>
      <TextContainer>
        <Title> All a&apos;Board </Title>
        <SubTitle>- Let the adveture begin!</SubTitle>
      </TextContainer>
      <BgImage path="https://images.unsplash.com/photo-1547638369-03b0e69b28d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />
    </Wrapper>
  );
};