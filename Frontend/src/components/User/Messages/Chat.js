import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import EmailIcon from '@material-ui/icons/Email';

import user from 'reducers/user';
import { ChatScreen } from './ChatScreen';
import { SendMessage } from './SendMessage';

const Chat = styled.div`
  width: 300px;
  height: 500px;
  border: solid black 0.5px;
  border-radius: 5px;
  background: #a65151;
`;

const Text = styled.p`
  color: #f2d3ac;
  font-size: 12px;
  margin-left: 10px;
`;

const Btn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
`;

const BtnText = styled.p`
  color: #a65151;
  font-size: 12px;
  font-weight: bold;
  margin: 0;
`;

export const ChatWindow = ({
  setVisibleLayer,
  visibleLayer,
  messageMode,
  setMessageMode,
}) => {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.user.userInfo);
  const friend = profile.friends.find(
    (friend) => friend.username === profile.activeFriend
  );
  const [message, setMessage] = useState('');

  const handleClick = () => {
    dispatch(user.actions.setActiveFriend(null));
    setMessageMode('messageList');
    setVisibleLayer('message');
  };

  return (
    <>
      <Btn onClick={handleClick}>
        <EmailIcon style={{ color: '#a65151' }} />
        <BtnText> Back to inbox</BtnText>
      </Btn>
      <Chat>
        <ChatScreen
          visibleLayer={visibleLayer}
          messageMode={messageMode}
          {...friend}
        />
        <Text type='Info'>You're chatting with {friend.username}</Text>
        <SendMessage setMessage={setMessage} message={message} {...friend} />
      </Chat>
    </>
  );
};
