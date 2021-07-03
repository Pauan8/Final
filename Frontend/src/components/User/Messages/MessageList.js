import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import user from 'reducers/user';

const Wrapper = styled.div`
  width: 290px;
  height: 100%;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MessageDisplay = styled.div`
  display: flex;
  background: #a65151;
  border-radius: 10px;
  padding: 2px;
  margin: 10px 0;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin: 0;
  text-align: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  color: #f2d3ac;
  font-size: ${(props) => (props.type === 'timeStamp' ? '11px' : '16px')};
  margin: 5px;
`;

const Image = styled.img`
  height: 50px;
  width: 50px;
`;

export const MessageList = ({ setMessageMode, setVisibleLayer }) => {
  const friends = useSelector((store) => store.user.userInfo.friends);
  let filteredFriends =
    friends && friends.length > 0
      ? friends.filter(
          (friend) => friend.messages && friend.messages.length > 0
        )
      : null;
  const dispatch = useDispatch();

  filteredFriends = filteredFriends
    ? filteredFriends
        .slice()
        .sort((a, b) =>
          a.messages[0].createdAt < b.messages[0].createdAt ? 1 : -1
        )
    : null;

  const handleClick = (friend) => {
    dispatch(user.actions.setActiveFriend(friend.username));
    setMessageMode('chat');
    setVisibleLayer('message');
  };

  return (
    <Wrapper>
      <Title>Messages</Title>
      {filteredFriends &&
        filteredFriends.map((friend) => (
          <MessageDisplay
            key={friend.user_id}
            onClick={() => handleClick(friend)}
          >
            <UserContainer>
              {friend.avatar ? (
                    <Image src={require(`../../../assets/avatar/${friend.avatar}`)} />
              ) : (
                <AccountCircleIcon style={{ fontSize: '40px' }} />
              )}
              <Text type='name'>{friend.username}</Text>
            </UserContainer>
            <TextContainer>
              <Text type='timeStamp'>Last message:</Text>
              <Text type='timeStamp'>
                {new Date(friend.messages[0].createdAt).toLocaleDateString()},
                {new Date(friend.messages[0].createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </TextContainer>
          </MessageDisplay>
        ))}
    </Wrapper>
  );
};
