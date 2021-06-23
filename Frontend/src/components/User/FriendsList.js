import React from 'react';
import { useDispatch, } from 'react-redux';
import styled from 'styled-components/macro';

import { answerFriendRequest } from '../../reducers/user'

const Wrapper = styled.div`
width: 300px;
height: 500px;
background: #f2d3ac;
border: solid #a65151 1px;
border-radius: 5px;
display: ${props => props.visible === 'friends' ? 'flex' : 'none'};
flex-direction: column;
align-items: center;
padding: 20px;

margin-top: 89px;
color: #733c3c;

@media (min-width: 768px) {
  border-right: none;
  border-radius: 5px 0 0 5px;
}
`

const Title = styled.h2``
const Pending = styled.div`

`
const Accepted = styled.div`
`

const Requests = styled.div`
`

export const FriendsList = ({ friends, visibleLayer, mode }) => {
  const dispatch = useDispatch();
  const handleFriends = (friend) => {
    if (friend.status === 0 && friend.state === "sender") {
      return (
        <Pending>
          {mode === "private" ? <p>{friend.username} - pending</p> : <></>}
        </Pending>
      );
    } else if (friend.status === 1) {
      return (
        <Accepted>
          <p>{friend.username} - accepted </p>
        </Accepted>
      );
    } else if (friend.status === 0 && friend.state === "reciever") {
      return (
        <Requests>
          {mode === "private" ? (
            <>
              <p>{friend.username} - requested</p>
              <button
                onClick={() =>
                  dispatch(answerFriendRequest(friend._id, 1))
                }
              >
                accept
              </button>
            </>
          ) : (
            <></>
          )}
        </Requests>
      );
    }
  };
  return (
    <Wrapper visible={visibleLayer}>
      <Title>Friends</Title>
      {friends ? (
        friends.length > 0 ? (
          friends.map((friend) => handleFriends(friend))
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </Wrapper>
  );
};