import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ProfileCard } from '../components/User/ProfileCard'
import { ProfileGameList } from 'components/User/ProfileGameList';
import { Menu } from '../components/Menu'
import { addFriend } from '../reducers/user'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PublicProfile = () => {
  const [user, setUser] = useState([]);
  const { username } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://secure-escarpment-13722.herokuapp.com/user/${username}`)
      .then((res) => res.json())
      .then((json) => setUser(json));
  }, [fetch]);

  return (
    <Wrapper>
      <Menu />
      {user.success? 
      <>
      <ProfileCard id="" mode={user} />
      <button onClick={() => dispatch(addFriend(username))}> add friend</button>
      <ProfileGameList mode={user} />  </>
      : <p>User doesn't exist</p>
    
}
    </Wrapper>
  );
};

export default PublicProfile;
