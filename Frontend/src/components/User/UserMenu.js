import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { logout } from '../../reducers/user';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  top: 5px;
  right: 5px;
  justify-content: flex-end;
  z-index: 6;
`;

const MenuLink = styled(Link)`
  text-decoration: none;
`;

const IconContainer = styled.div`
  position: absolute;
  z-index: 8;
  right: 5px;
  top: 0;

  @media (min-width: 768px) {
    right: 50px;
  }
`;

const MenuItem = styled.h3`
  position: relative;
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

const Expanded = styled.div`
  background: white;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 6;
  overflow-y: ${(props) => (props.expand ? 'auto' : 'hidden')};
  height: ${(props) => (props.expand ? '100vh' : '0')};
  transition: height 2s ease-in-out;

  @media (min-width: 1024px) {
    width: 300px;
  }
`;

export const UserMenu = ({ font }) => {
  const userID = useSelector((store) => store.user.userInfo.userID);
  const [expand, setExpand] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const loggedInArr = [
    { name: 'Profile', path: `/profile/${userID}` },
    { name: 'Edit', path: `/profile/${userID}/edit` },
    { name: 'Logout' },
  ];
  const loggedOutArr = [
    { name: 'Sign Up', path: '/Signup' },
    { name: 'Log In', path: '/Login' },
  ];

  const onLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  const renderMenu = (arr) => {
    return (
      <>
        {arr.map((item) =>
          item.name !== 'Logout' ? (
            <MenuLink to={item.path} key={item.name}>
              <MenuItem>{item.name}</MenuItem>
            </MenuLink>
          ) : (
            <MenuItem onClick={onLogout} key={item.name}>
              Log out
            </MenuItem>
          )
        )}
      </>
    );
  };

  return (
    <Wrapper>
      <IconContainer>
        <AccountCircleIcon
          style={{ fontSize: font }}
          onClick={() => setExpand(!expand)}
        />
      </IconContainer>
      <Expanded expand={expand}>
        {localStorage.getItem('token')
          ? renderMenu(loggedInArr)
          : renderMenu(loggedOutArr)}
      </Expanded>
    </Wrapper>
  );
};
