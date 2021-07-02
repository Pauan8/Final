import React from "react";
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { WriteMessage } from "./WriteMessage";

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
    align-self: ${props => props.user === 'friend' ? "flex-start" : "flex-end"};
    margin: 10px;
    background: #f2d3ac;
    border-radius: 10px;
    padding: 0 10px;
    width: 50%;`

const FriendImg = styled.img`
    width: 40px;
    height: 40px;`

const Text = styled.p`
    font-size: ${props => props.type === 'TimeStamp'? "12px" : "14px"};
    font-weight: ${props => props.type === 'Name'? "bold" : "normal"};
    color: ${props => props.type === 'Message' ? "black" : "#a65151"};`

const Friend = styled.div`
    display: flex;`

export const ChatWindow = () => {
    const friend = useSelector((store) => store.user.userInfo.activeFriend)
    const sortMessages = friend.messages ? friend.messages.slice().sort((a,b) => a.createdAt > b.createdAt? -1 : 1) : null;

  return (
      <Chat>
          <ChatInner>
        {sortMessages ? (
          sortMessages.map((msg) => (
            <Bubble key={msg._id}
              user={
                msg.sender === friend.username
                  ? "friend"
                  : "currentUser"
              }
            >
              {msg.sender === friend.username ? (
                <Friend>
                {friend.avatar
                ? <FriendImg src={require(`../../../assets/${friend.avatar}`)}></FriendImg> 
                : <AccountCircleIcon style={{ fontSize: 50 }} />}
                    <Text type="Name">{friend.username}</Text>
                </Friend>
              ) : (
                <></>
              )}
              <Text type="Message">{msg.message}</Text>
                <Text type="TimeStamp">
                  Sent: {new Date(msg.createdAt).toLocaleDateString()}, 
                  {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </Text>
            </Bubble>
          ))
        ) : (
          <></>
        )}
        </ChatInner>
         <WriteMessage user={friend.username} />
      </Chat>
  );
};