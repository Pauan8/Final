import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { answerFriendRequest } from '../../reducers/user';
import { TransparentBtn } from 'components/Reusable/TransparentBtn';

const Wrapper = styled.div`
  width: 300px;
  height: 500px;
  background: #f2d3ac;
  border: solid #a65151 1px;
  border-radius: 5px;
  display: ${(props) => (props.visible === 'friends' ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  padding: 20px;

  margin-top: 89px;
  color: #733c3c;

  @media (min-width: 768px) {
    border-right: none;
    border-radius: 5px 0 0 5px;
  }
`;

const Title = styled.h2``;

const Text = styled.p`
  color: #f2d3ac;
`;

const FriendContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 70px;
  background: #a65151;
  width: 100%;
  border-radius: 5px;
`;

const Image = styled.img`
  height: 50px;
  width: 50px;
`;

export const FriendsList = ({ friends, visibleLayer, mode }) => {
  const dispatch = useDispatch();

  const handleFriends = (friend) => {
    if (friend.status === 0 && friend.state === 'sender') {
      return (
        <FriendContainer key={friend._id}>
          {mode === 'private' ? (
            <Text>{friend.username} - pending</Text>
          ) : (
            <></>
          )}
        </FriendContainer>
      );
    } else if (friend.status === 1) {
      return (
        <FriendContainer key={friend._id}>
          <Text>{friend.username} - accepted </Text>
        </FriendContainer>
      );
    } else if (friend.status === 0 && friend.state === 'reciever') {
       
      return (
        <FriendContainer key={friend._id}>
          {mode === 'private' ? (
            <>
              <Image src={friend.avatar} />
              <Text>{friend.username} - requested</Text>
              <TransparentBtn
                handleClick={() => dispatch(answerFriendRequest(friend.username, 1, friend._id))}
                fontSize='30px'
                text='✓'
                color='#C1D98F'
              />
              <TransparentBtn
                handleClick={() => dispatch(answerFriendRequest(friend.username, 2, friend._id))}
                fontSize='30px'
                color='#F2811D'
                text='✗'
              />
            </>
          ) : (
            <></>
          )}
        </FriendContainer>
      );
    }
  };

  const sortFriends = () => {
    friends
    .sort((a, b) => (a.status > b.status ? 1 : -1))
    .map((friend) => handleFriends(friend))
  }
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
