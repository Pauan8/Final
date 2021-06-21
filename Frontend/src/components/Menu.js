import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

import { UserMenu } from '../components/User/UserMenu'

const Wrapper = styled.div`
  height: 50px;
  width: calc(100% - 40px);
  display: flex;
  padding: 0 20px ;
  justify-content: space-between;
  position: relative;
`;

const Bg = styled.div`
  background-image: url(${require('../assets/background.jpg')});
  background-attachment: fixed;
  background-size: cover;
  background-position-y: top;
  opacity: 0.3;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  height: 50px;
  width: 100%;
`;

const MenuLink = styled(Link)`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;`

const MenuItem = styled.h3`
  cursor: pointer;
  z-index: 6;
  display: flex;
  align-items: center;
  justify-content: center;`


export const Menu = () => {
  return (
    <Wrapper>
      <Bg></Bg>
      <MenuLink to="/">
        <MenuItem>
          <HomeIcon style={{ fontSize: '40'}}></HomeIcon>
        </MenuItem>
      </MenuLink>
      <MenuItem>
        <UserMenu font='40'/>
      </MenuItem>
    </Wrapper>
  );
};
