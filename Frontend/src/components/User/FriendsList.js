import { FireplaceRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { answerFriendRequest } from '../../reducers/user'

const Pending = styled.div``
const Accepted = styled.div``
const Requests = styled.div``

export const FriendsList = ({ friends }) => {
const dispatch = useDispatch();
    const handleFriends = (friend) => {
    if(friend.status === 0 && friend.state === 'sender'){
        return <Pending><p>{friend.username} - pending</p></Pending>
    } else if ( friend.status === 1 ){
        return <Accepted><p>{friend.username} - accepted </p></Accepted>
    } else if( friend.status === 0 && friend.state === 'reciever'){
        return <Requests><p>{friend.username} - requested</p><button onClick={() => dispatch(answerFriendRequest(friend.username, 1))}>accept</button></Requests>
    }
}
    return <div>{friends ? friends.length > 0? friends.map(friend => handleFriends(friend)): <></>:<></>}</div>
}