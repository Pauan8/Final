import React from 'react';
import styled from 'styled-components/macro';

import { UserMenu } from './User/UserMenu';

const Wrapper = styled.header`
  position: relative;
  height: 207px;
  z-index: 3;
  background: lightgray;

  @media (min-width: 1024px) {
    height: 260px;
  }
`;

const BgImage = styled.div`
  position: absolute;
  height: 207px;
  width: 100%;
  background-image: url(${require('../assets/background.jpg')});
  background-attachment: fixed;
  background-size: cover;
  background-position-y: top;
  opacity: 0.3;
  z-index: -1;

  @media (min-width: 1024px) {
    height: 260px;
  }
`;

const TextContainer = styled.div`
  position: absolute;
  height: 207px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10%;

  @media (min-width: 768px) {
    margin-left: 180px;
  }
  @media (min-width: 1024px) {
    margin-left: 300px;
    height: 260px;
  }
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;

  @media (min-width: 768px){
    width: auto;
  height: auto;
  }
`;

const SubTitle = styled.h2`
  margin: 0%;
  color: #011126;
`;

const UserMenuContainer = styled.div`
position: absolute;
z-index: 6;
right: 0;

@media (min-width: 768px){
  right: 50px;
}`

export const Header = () => {
  return (
    <Wrapper>
      <UserMenuContainer>
        <UserMenu font='50'/>
      </UserMenuContainer>
      <TextContainer>
        <Logo src={window.innerWidth < 768? require('../assets/logo-xs.svg') : require('../assets/logo.svg')} />
        <SubTitle>- Let the adventure begin!</SubTitle>
      </TextContainer>
      <BgImage />
    </Wrapper>
  );
};
