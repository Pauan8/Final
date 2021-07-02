import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import user,{ answerFriendRequest } from '../../../reducers/user';
import { TransparentBtn } from '../../../components/Reusable/TransparentBtn';

const Wrapper = styled.div`
  width: 300px;
  height: 500px;
  overflow-y: auto;
  background: #f2d3ac;
  border: solid #a65151 1px;
  border-radius: 5px;
  display: ${(props) => (props.visible === 'friends' ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  padding: 20px;

  margin-top: 89px;
  color: #733c3c;

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
    background-color: #F2B279;
    border-radius: 20px;
    border: 3px solid #F2B279;
  }

  @media (min-width: 768px) {
    border-right: none;
    border-radius: 5px 0 0 5px;
  }
`;

const Title = styled.h2`
margin: 0;`;

const SubTitle = styled.h3`
margin-bottom: 3px;`;

const Text = styled.p`
margin-left: 10px;
  color: #f2d3ac;
  font-weight: bold;
`;

const FriendContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  background: #a65151;
  padding: 0 10px;
  width: calc(100% - 20px);
  border-radius: 5px;
  margin-bottom: 10px;
`;

const FriendContainerInner = styled.div`
    display: flex;`

const Btn = styled.button`
    background: transparent;
    border: none;
    padding: none;

    &:active,
    &:hover,
    &:focus{
        background: #f2d3ac;
    }
`

const Img = styled.image`
    width: 50px;
    height: 50px;`

const ButtonContainer = styled.div`
  display: flex;`

export const FriendsList = ({
  friends,
  visibleLayer,
  setVisibleLayer,
  mode,
  setMessageMode,
}) => {
  const dispatch = useDispatch();
  let declined = friends && friends.length > 0 ? friends.filter((friend) => friend.stat === 2) : [];
  let pending = friends && friends.length > 0 ? friends.filter((friend) => friend.stat === 0 && friend.state === 'sender') : [];
  let recieved = friends && friends.length > 0 ? friends.filter((friend) => friend.stat === 0 && friend.state === 'reciever') : [];
  let accepted = friends && friends.length > 0 ? friends.filter((friend) => friend.stat === 1) : [];

  const handleClick = (friend) => {
    dispatch(user.actions.setActiveFriend(friend.username))
    setMessageMode('chat')
    setVisibleLayer('message')
  }

  const handleFriends = (friend) => {
    if (friend.stat === 2 && friend.state === 'sender') {
      return (
        <>
          <Text>{friend.username}</Text>
          <TransparentBtn
            handleClick={() => dispatch(handleFriends(friend.user_id, 'remove'))}
            fontSize='30px'
            color='#F2811D'
            text='✗'
          />
        </>
      );
    } else if (friend.stat === 0 && friend.state === 'sender') {
      return <Text>{friend.username}</Text>;
    } else if (friend.stat === 1) {
      return (
        <>
          <FriendContainerInner>
            {friend.avatar ? (
              <Img src={require(`../../../assets/avatar/${friend.avatar}`)} />
            ) : (
              <AccountCircleIcon style={{ fontSize: 50 }} />
            )}
            <Text>{friend.username}</Text>
          </FriendContainerInner>
          <Btn onClick={() => handleClick(friend)}>
            <MailOutlineIcon />
          </Btn>
        </>
      );
    } else if (friend.stat === 0 && friend.state === 'reciever') {
      return (
        <>
          <Text>{friend.username}</Text>
          <ButtonContainer>
            <TransparentBtn
              handleClick={() =>
                dispatch(answerFriendRequest(friend.user_id, 1))
              }
              fontSize='14px'
              text='Accept'
              color='#C1D98F'
            />
            <TransparentBtn
              handleClick={() =>
                dispatch(answerFriendRequest(friend.user_id, 2))
              }
              fontSize='14px'
              color='#F2811D'
              text='Decline'
            />
          </ButtonContainer>
        </>
      );
    }
  };

  const renderFriends = (arr, title) => {
    if (arr.length > 0) {
      if (
        ((title === 'Declined' ||
          title === 'Recieved' ||
          title === 'Pending') &&
          mode === 'private') ||
        title === 'Friends'
      ) {
        return (
          <>
            <SubTitle>{title}</SubTitle>
            {arr.map((friend) => (
              <FriendContainer key={friend.user_id}>
                {handleFriends(friend)}
              </FriendContainer>
            ))}
          </>
        );
      }
    }
  };

  return (
    <Wrapper visible={visibleLayer}>
      <Title>Friendlist</Title>
      {friends && friends.length > 0 ? (
        <>
          {renderFriends(declined, 'Declined')}
          {renderFriends(recieved, 'Recieved')}
          {renderFriends(pending, 'Pending')}
          {renderFriends(accepted, 'Friends')}
        </>
      ) : (
        <>No friends {':/'} </>
      )}
    </Wrapper>
  );
};
