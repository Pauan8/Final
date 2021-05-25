import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import hexArr from 'data/hexArray.json'


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 5;
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
  &:nth-child(8) > div
  {
    background: #D7BD8F;
    color: white;
  }

  &:nth-child(4):hover > div,
  &:nth-child(8):hover > div
  {
    background: darkcyan;
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
  background: #B5D5B5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: solid beige;
`;

const MenuTitles = styled.h2`
  font-size: 20px;
  -webkit-transform: skew(-300deg);
  -ms-transform: skew(-30deg);
  transform: skew(-30deg);
`;

const PathLink = styled(Link)`
text-decoration: none;
color: white;

&:hover{
  color: darkslategray;
  font-style: bold;
}
`


export const Sidebar = () => {
  const setMenuTitles = (index) => {
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
    if (window.innerWidth > 767) {
      return arr.map((hex, i) => (
         <Outerclip
          left={hex.left}
          up={hex.top}>
          <Innerclip>
          <PathLink to={setMenuTitles(i).toLowerCase().replace(" ", "")} >
            <MenuTitles>{setMenuTitles(i)}</MenuTitles>
            </PathLink> 
          </Innerclip>
        </Outerclip>
      ));
    } else {
      return <></>;
    }
  };

  return (
    <Wrapper>
      {onMapArray(hexArr)}
    </Wrapper>
  );
};