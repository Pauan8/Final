import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';

import { ProfileCard } from '../components/User/ProfileCard'

const Wrapper = styled.div`
  position: relative;
`;

const Name = styled.h1``;

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
      <Name>{user.username}</Name>
      <ProfileCard id="" mode={user} />
    </Wrapper>
  );
};

export default PublicProfile;
