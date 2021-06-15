import React from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.div`
height: 50px;
width: 100%;
display: flex;
justify-content: space-evenly;
position: relative;
`

const Bg = styled.div`
background-image: url(${require("../assets/background.jpg")});
background-attachment: fixed;
  background-size: cover;
  background-position-y: top;
  opacity: 0.3;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;
  height: 50px;
 width: 100%;`


const MenuItem = styled.h3`

`
export const Menu = () => {
    return (
      <Wrapper>
        <Bg></Bg>
        <MenuItem>Home</MenuItem>
        <MenuItem>About</MenuItem>
        <MenuItem>Something</MenuItem>
        <MenuItem>Some</MenuItem>
      </Wrapper>
    );
}