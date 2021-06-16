import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  justify-content: flex-end;

  @media (min-width: 768px) {
    right: 50px;
  }
`;

const ProfileLink = styled(Link)`
  color: #608ba6;

  &:hover {
    color: #011c40;
  }
  &:active {
    color: #011c40;
  }
`;

export const UserMenu = () => {
  const userID = useSelector((store) => store.user.userInfo.userID);

  return (
    <Wrapper>
      <ProfileLink to={`/profile/${userID}`}>
        <AccountCircleIcon style={{ fontSize: 50 }} />
      </ProfileLink>
    </Wrapper>
  );
};
