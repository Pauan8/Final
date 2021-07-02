import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import PeopleIcon from '@material-ui/icons/People';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import { FriendsList } from './FriendsList';
import { Messages } from '../Messages/Messages';
import { ProfileCard } from './ProfileCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TabContainer = styled.div`
  display: flex;
  width: 340px;
  justify-content: flex-end;
  position: absolute;
  top: 50px;
`;

const Tab = styled.button`
  height: 40px;
  width: 40px;
  background: ${(props) =>
    props.visible === props.name ? '#F2D3AC' : 'transparent'};
  border: solid #a65151 0.5px;
  margin-bottom: -2px;
`;

const Notification = styled.div`
  background: #f2811d;
`;

const NotificationNumber = styled.span`
  color: black;
`;

export const Profile = ({ id, mode }) => {
  const [visibleLayer, setVisibleLayer] = useState('profile');
  const [messageMode, setMessageMode] = useState('messageList');
  const user = useSelector((store) => store.user.userInfo);
  const profile = mode === 'private' ? user : mode;
  const pending =
    user.friends && user.friends.length > 0
      ? user.friends.filter(
          (friend) => friend.stat === 0 && friend.state === 'reciever'
        )
      : null;

  return (
    <Container>
      <TabContainer>
        <Tab
          onClick={() => setVisibleLayer('profile')}
          name='profile'
          visible={visibleLayer}
        >
          <AccountCircleIcon />
        </Tab>
        <Tab
          onClick={() => setVisibleLayer('friends')}
          name='friends'
          visible={visibleLayer}
        >
          {pending && pending.length > 0 && mode === 'private' ? (
            <Notification>
              <NotificationNumber>{pending.length}</NotificationNumber>
            </Notification>
          ) : (
            <></>
          )}
          <PeopleIcon />
        </Tab>
        {mode === 'private' ? (
          <Tab
            onClick={() => setVisibleLayer('message')}
            name='message'
            visible={visibleLayer}
          >
            <MailOutlineIcon />
          </Tab>
        ) : (
          <></>
        )}
      </TabContainer>
      <FriendsList
        friends={profile.friends}
        visibleLayer={visibleLayer}
        setVisibleLayer={setVisibleLayer}
        setMessageMode={setMessageMode}
        mode={mode}
      />
      <Messages
        visibleLayer={visibleLayer}
        setVisibleLayer={setVisibleLayer}
        messageMode={messageMode}
        setMessageMode={setMessageMode}
      />
      <ProfileCard
        id={id}
        visibleLayer={visibleLayer}
        mode={mode}
        profile={profile}
      />
    </Container>
  );
};
