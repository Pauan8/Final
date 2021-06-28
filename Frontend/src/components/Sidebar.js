import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import hexArr from 'data/hexArray.json';

const Wrapper = styled.div`
display: none;

  @media (min-width: 768px){
    display: flex;
  flex-direction: column;
  position: relative;
  z-index: 5;
  }
`;

const Outerclip = styled.div`
  position: fixed;
  margin-right: 40px;
  -webkit-transform: skew(-30deg);
  -ms-transform: skew(-30deg);
  transform: skew(-30deg);
  overflow: hidden;
  display: inline-block;
  opacity: 1;
  height: 100px;
  width: 100px;
  top: ${(props) => `calc(${props.up} * 53px)`};
  margin-left: ${(props) => `calc(${props.left} * 38px)`};

  &:nth-child(4) > div,
  &:nth-child(8) > div {
    background: ${props => props.token? "#c2d991": "#d94a56"};
  }

  &:nth-child(4):hover > div,
  &:nth-child(8):hover > div {
    background: ${props => props.token? "#c2d991": "#608ba6"};
  }
`;

const Innerclip = styled.div`
  height: 100px;
  width: 100px;
  -webkit-transform: skew(50deg);
  -ms-transform: skew(50deg);
  transform: skew(50deg);
  overflow: hidden;
  display: inline-block;
  background: #c2d991;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border-right: solid beige;
`;

const MenuTitles = styled.h2`
  font-size: 20px;
  height: 50px;
  display: flex;
  align-items: center;
  -webkit-transform: skew(-300deg);
  -ms-transform: skew(-30deg);
  transform: skew(-30deg);
`;

const PathLink = styled(Link)`
  text-decoration: none;
  color: white;

  &:hover {
    color: #011c40;
    font-style: bold;
  }
`;

export const Sidebar = () => {
  const token = localStorage.getItem('token');
  const setMenuTitles = (index) => {
    if(token){
      return '';
    }

    switch (index) {
      case 3:
        return 'Sign Up';
      case 7:
        return 'Log In';
      default:
        return '';
  }
   
  };

  const onMapArray = (arr) => {
      return arr.map((hex, i) => (
        <Outerclip key={`hex${i}`} left={hex.left} up={hex.top} token={token? true:false}>
          <Innerclip>
            <PathLink to={setMenuTitles(i).toLowerCase().replace(' ', '')}>
              <MenuTitles>{setMenuTitles(i)}</MenuTitles>
            </PathLink>
          </Innerclip>
        </Outerclip>
      ));
    }

  return <Wrapper>{onMapArray(hexArr)}</Wrapper>;
};
