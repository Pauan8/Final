import React, { useState } from "react";
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro';

import { WriteMessage } from "./WriteMessage";

const Chat = styled.div`
    width: 300px;
    height: 400px;
    border: solid black;
    background: #a65151;`

const Bubble = styled.div`
    float: ${props => props.user === 'friend' ? "left" : "right "};
    margin: 10px;
    border: solid black 0.5px;
    background: #f2d3ac;
    border-radius: 10px;
    padding: 0 10px;
    width: 50%;`

const FriendImg = styled.img`
    width: 40px;
    height: 40px;`

const Message = styled.p`
    font-size: 14px;`

const TimeStamp = styled.p`
    font-size: 11px;
    margin: 5px 0;`

export const ChatWindow = () => {
    const friend = useSelector((store) => store.user.userInfo.activeFriend)
   
  return (
    <>
      <Chat>
        {friend.messages ? (
          friend.messages.map((msg) => (
            <Bubble key={msg._id}
              user={
                msg.sender === friend.username
                  ? "friend"
                  : "currentUser"
              }
            >
              {msg.sender === friend.username ? (
                <FriendImg></FriendImg>
              ) : (
                <></>
              )}
              <Message>{msg.message}</Message>
              <TimeStamp>Sent: {new Date(msg.createdAt).toLocaleDateString()}, {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</TimeStamp>
            </Bubble>
          ))
        ) : (
          <></>
        )}
      </Chat>
      <WriteMessage user={friend.username} />
    </>
  );
};