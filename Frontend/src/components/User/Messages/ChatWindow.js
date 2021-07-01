import React, { useState } from "react";
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro';

import { WriteMessage } from "./WriteMessage";

const Chat = styled.div`
    width: 300px;
    height: 400px;
    border: solid black;`

const Bubble = styled.div`
    float: ${props => props.user === 'friend' ? "right" : "left "};`

const FriendImg = styled.img`
width: 40px;
height: 40px;`

const Message = styled.p``

const TimeStamp = styled.p``

export const ChatWindow = () => {
    const friend = useSelector((store) => store.user.userInfo.activeFriend)
   
  return (
    <>
      <Chat>
        {friend.messages ? (
          friend.messages.map((msg) => (
            <Bubble
              user={
                msg.sender.username === friend.username
                  ? "friend"
                  : "currentUser"
              }
            >
              {msg.sender.username === friend.username ? (
                <FriendImg></FriendImg>
              ) : (
                <></>
              )}
              <Message></Message>
              <TimeStamp></TimeStamp>
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