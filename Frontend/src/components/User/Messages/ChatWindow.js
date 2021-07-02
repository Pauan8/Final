import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { TransparentBtn } from 'components/Reusable/TransparentBtn';
import { fetchMessages, sendMessage } from 'reducers/user';

const Chat = styled.div`
    width: 300px;
    height: 500px;
    border: solid black 0.5px;
    border-radius: 5px;
    background: #a65151;`

const ChatInner = styled.div`
    height: 443px;
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;`

const Bubble = styled.div`
    align-self: ${props => props.user === 'friend' ? 'flex-start' : 'flex-end'};
    margin: 10px;
    background: #f2d3ac;
    border-radius: 10px;
    padding: 0 10px;
    width: 50%;`

const FriendImg = styled.img`
    width: 40px;
    height: 40px;`

const Text = styled.p`
    font-size: ${props => props.type === 'TimeStamp'? '12px' : '14px'};
    font-weight: ${props => props.type === 'Name'? 'bold' : 'normal'};
    color: ${props => props.type === 'Message' ? 'black' : '#a65151'};`

const Friend = styled.div`
    display: flex;`

const Send= styled.div`
display: flex;
background: white;
height: 55px;
width: 300px;
border-bottom-right-radius: 5px;
border-bottom-left-radius: 5px;
`;

const TextInput = styled.textarea`
display: flex;
flex: 1 1 auto;
height: 49px;
border: none;
border-right: solid black 0.5px;
`;

export const ChatWindow = ({mode, messageMode}) => {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user.userInfo)
    const friend = user.friends.find(friend => friend.username === user.activeFriend)
    const [message, setMessage] = useState("")
    const [msgs, setMsgs] = useState(friend.messages);
    const sortMessages = msgs ? msgs.slice().sort((a,b) => a.createdAt > b.createdAt? -1 : 1) : null;
    let update;

    const handleClick = () => {
        dispatch(sendMessage(friend.username, message));
        setMessage('');
      };

    const fetchMessageList = useCallback(() => {
        clearInterval(update) 
        dispatch(fetchMessages(friend.username))
        setMsgs(friend.messages)
    }, [setMsgs, dispatch, friend.messages, friend.username])

    useEffect(() => {
        update = setInterval(fetchMessageList, 1000);
        if(mode !== "message" || messageMode !== "chat"){
            return clearInterval(update) 
        }
      }, [fetchMessageList]);

  return (
      <Chat>
          <ChatInner>
        {sortMessages ? (
          sortMessages.map((msg) => (
            <Bubble key={msg._id}
              user={
                msg.sender === friend.username
                  ? 'friend'
                  : 'currentUser'
              }
            >
              {msg.sender === friend.username ? (
                <Friend>
                {friend.avatar
                ? <FriendImg src={require(`../../../assets/${friend.avatar}`)}></FriendImg> 
                : <AccountCircleIcon style={{ fontSize: 50 }} />}
                    <Text type='Name'>{friend.username}</Text>
                </Friend>
              ) : (
                <></>
              )}
              <Text type='Message'>{msg.message}</Text>
                <Text type='TimeStamp'>
                  Sent: {new Date(msg.createdAt).toLocaleDateString()}, 
                  {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </Text>
            </Bubble>
          ))
        ) : (
          <></>
        )}
        </ChatInner>
        <Send>
            <TextInput
                value={message}
                onChange={(event) => setMessage(event.target.value)}
            />
            <TransparentBtn
                text='Send'
                color='black'
                fontSize='12px'
                handleClick={handleClick}
            />
            </Send>
      </Chat>
  );
};