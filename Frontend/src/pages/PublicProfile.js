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
  min-height: calc(100vh - 150px);
  width: 100%;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }
`;


const PublicProfile = () => {
  const [user, setUser] = useState([]);
  const { username } = useParams();
 

  useEffect(() => {
    fetch(`http://localhost:8080/user/${username}`)
      .then((res) => res.json())
      .then((json) => setUser(json));
  }, [fetch]);

  return (
      <>
    <Menu />
    <Wrapper>
   
      {user.success? 
      <>
      <ProfileCard id="" mode={user} />
      <ProfileGameList mode={user} />  </>
      : <p>User doesn't exist</p>
    
}
    </Wrapper>
    </>
  );
};

export default PublicProfile;
