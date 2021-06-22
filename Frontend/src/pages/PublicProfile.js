import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';

import { ProfileCard } from '../components/User/ProfileCard'
import { ProfileGameList } from 'components/User/ProfileGameList';
import { Menu } from '../components/Menu'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PublicProfile = () => {
  const [user, setUser] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    fetch(`https://secure-escarpment-13722.herokuapp.com/user/${username}`)
      .then((res) => res.json())
      .then((json) => setUser(json));
  }, [fetch]);

  return (
    <Wrapper>
      <Menu />
      <ProfileCard id="" mode={user} />
      <button> add friend</button>
      <ProfileGameList mode={user} />
    </Wrapper>
  );
};

export default PublicProfile;
