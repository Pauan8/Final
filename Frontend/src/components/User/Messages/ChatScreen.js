import React, { useCallback, useEffect, useState } from 'react';
import {  useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { fetchMessages } from 'reducers/user';

const Wrapper = styled.div`
  height: 380px;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;

  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: #a65151 transparent;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #a65151;
    border-radius: 20px;
    border: 3px solid #a65151;
  }
`;

const Bubble = styled.div`
  align-self: ${(props) =>
    props.user === 'friend' ? 'flex-start' : 'flex-end'};
  margin: 10px;
  background: #f2d3ac;
  border-radius: 10px;
  padding: 0 10px;
  width: 50%;
`;

const FriendImg = styled.img`
  width: 40px;
  height: 40px;
`;

const Text = styled.p`
  font-size: ${(props) => (props.type === 'TimeStamp' ? '12px' : '14px')};
  font-weight: ${(props) => (props.type === 'Name' ? 'bold' : 'normal')};
  color: ${(props) =>
    props.type === 'Message'
      ? 'black'
      : '#a65151'};
`;

const Friend = styled.div`
  display: flex;
`;

export const ChatScreen = ({visibleLayer,  messageMode, messages, username, avatar}) => {
    const dispatch = useDispatch();
  const [msgs, setMsgs] = useState(messages);
  const sortMessages = msgs
    ? msgs.slice().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
    : null;
  let update;

    const fetchMessageList = useCallback(() => {
        clearInterval(update);
        dispatch(fetchMessages(username));
        setMsgs(messages);
      }, [setMsgs, dispatch, messages, username]);
    
      useEffect(() => {
        update = setInterval(fetchMessageList, 1000);
        if (visibleLayer !== 'message' || messageMode !== 'chat') {
          return clearInterval(update);
        }
      }, [fetchMessageList]);

    if(sortMessages){
    return <Wrapper>
      {sortMessages.map((msg) => (
        <Bubble
          key={msg._id}
          user={msg.sender === username ? 'friend' : 'currentUser'}
        >
          {msg.sender === username ? (
            <Friend>
              {avatar ? (
                <FriendImg
                  src={require(`../../../assets/${avatar}`)}
                ></FriendImg>
              ) : (
                <AccountCircleIcon style={{ fontSize: 50 }} />
              )}
              <Text type='Name'>{username}</Text>
            </Friend>
          ) : (
            <></>
          )}
          <Text type='Message'>{msg.message}</Text>
          <Text type='TimeStamp'>
            Sent: {new Date(msg.createdAt).toLocaleDateString()},
            {new Date(msg.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </Bubble>
      ))}
  </Wrapper>
    }
    return <Wrapper>Start with saying hi!</Wrapper>
}