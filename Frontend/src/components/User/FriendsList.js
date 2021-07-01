import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { answerFriendRequest } from '../../reducers/user';
import { TransparentBtn } from 'components/Reusable/TransparentBtn';

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

  @media (min-width: 768px) {
    border-right: none;
    border-radius: 5px 0 0 5px;
  }
`;

const Title = styled.h2``;

const SubTitle = styled.h3``;

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
  margin-bottom: 10px;
`;


export const FriendsList = ({ friends, visibleLayer, mode }) => {
  const dispatch = useDispatch();
  let declined = friends && friends.length > 0? friends.filter(friend => friend.status === 2) : [];
  let pending = friends && friends.length > 0? friends.filter(friend => friend.status === 0 && friend.state === 'sender'): [];
  let recieved = friends && friends.length > 0? friends.filter(friend => friend.status === 0 && friend.state === 'reciever'): [];
  let accepted = friends && friends.length > 0? friends.filter(friend => friend.status === 1): [];

  const handleFriends = (friend) => {
    if (friend.status === 2 && friend.state === 'sender') {
        return (
          mode === 'private' ? (
          <FriendContainer key={friend.user_id}>
              <Text>{friend.username}</Text>
              <TransparentBtn  
                handleClick={()=>console.log("clicked")}
                fontSize='30px'
                color='#F2811D'
                text='✗' />
          </FriendContainer>
            ) : (
              <></>
            )
          )
    } else if (friend.status === 0 && friend.state === 'sender') {
      return (
        mode === 'private' ? (
        <FriendContainer key={friend.user_id}>
            <Text>{friend.username}</Text>
        </FriendContainer>
          ) : (
            <></>
          )
        )
    } else if (friend.status === 1) {
      return (
        <FriendContainer key={friend.user_id}>
          <Text>{friend.username}</Text>
        </FriendContainer>
      );
    }  else if (friend.status === 0 && friend.state === 'reciever') {
      return (
        <FriendContainer key={friend.user_id}>
          {mode === 'private' ? (
            <>
              <Text>{friend.username}</Text>
              <TransparentBtn
                handleClick={() => dispatch(answerFriendRequest(friend.user_id, 1))}
                fontSize='30px'
                text='✓'
                color='#C1D98F'
              />
              <TransparentBtn
                handleClick={() => dispatch(answerFriendRequest(friend.user_id, 2))}
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
  
  const renderFriends = (arr, title) => {
    if(arr.length > 0 ){ 
        if(title === "Declined" || title === "Recieved" || title === "Pending"){
        return <>{mode === "private" ? <><SubTitle>{title}</SubTitle>
        {arr.map(friend => handleFriends(friend))}</>:<></>}</>
      } else {
          return <><SubTitle>{title}</SubTitle>
          {arr.map(friend => handleFriends(friend))}</>
      }
    } 
}  

  return (
    <Wrapper visible={visibleLayer}>
      <Title>Friendlist</Title>
      {friends && friends.length > 0 ? (<>
        {renderFriends(declined, "Declined")}
        {renderFriends(recieved, "Recieved")}
        {renderFriends(pending, "Pending")}
        {renderFriends(accepted, "Friends")}
       </>) : (
        <>No friends {":/"} </>
      )}
    </Wrapper>
  );
};
