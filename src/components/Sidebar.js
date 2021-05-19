import React from 'react'
import styled from 'styled-components'

import hexArrL from 'data/hexArrayLeft.json'
import hexArrR from 'data/hexArrayRight.json'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
`;

const Outerclip = styled.div`
  position: fixed;
  margin-right: 40px;
  -webkit-transform: skew(-30deg);
  -ms-transform: skew(-30deg);
  transform: skew(-30deg);
  overflow: hidden;
  display: inline-block;
  right: ${(props) => (props.align === 'right' ? 0 : '')};
  left: ${(props) => (props.align === 'left' ? 0 : '')};
  opacity: 0.9;
  height: 100px;
  width: 100px;
  top: ${(props) => `calc(${props.up} * 53px)`};
  margin-left: ${(props) => `calc(${props.left} * 38px)`};
  margin-right: ${(props) => `calc(${props.right} * 38px)`};

  &:nth-child(7):hover > div,
  &:nth-child(9):hover > div,
  &:nth-child(13):hover > div,
  &:nth-child(39):hover > div,
  &:nth-child(41):hover > div,
  &:nth-child(45):hover > div {
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
  background: #b9cdd8;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuTitles = styled.h2`
  font-size: 16px;
  color: white;
  -webkit-transform: skew(-300deg);
  -ms-transform: skew(-30deg);
  transform: skew(-30deg);
  font-family: "Raleway", sans-serif;
`;

export const Sidebar = () => {
  const setMenuTitles = (index) => {
    switch (index) {
      case 6:
        return 'Top 10';
      case 8:
        return 'Newest';
      case 12:
        return 'Popular';
      default:
        return '';
    }
  };
  const onMapArray = (arr, alignment) => {
    if (window.innerWidth > 767) {
      return arr.map((hex, i) => (
        <Outerclip
          align={alignment}
          left={alignment === 'left' ? hex.left : ''}
          right={alignment === 'right' ? hex.right : ''}
          up={hex.top}>
          <Innerclip>
            <MenuTitles>{setMenuTitles(i)}</MenuTitles>
          </Innerclip>
        </Outerclip>
      ));
    } else {
      return <></>;
    }
  };
  return (
    <Wrapper>
      {onMapArray(hexArrL, 'left')}
      {onMapArray(hexArrR, 'right')}
    </Wrapper>
  );
};