import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';

import { SearchUser } from '../components/SearchUser'
import { Profile } from '../components/User/Profile/Profile'
import { ProfileGameList } from 'components/User/Profile/ProfileGameList';
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

const NoUser = styled.div` 
    display: flex;
    flex-direction: column;
    justify-content: center;` 

const Text = styled.p`
    flex: 1 1 auto;
    text-align: center;`

const PublicProfile = () => {
  const [user, setUser] = useState([]);
  const { username } = useParams();
 

  useEffect(() => {
    fetch(`http://localhost:8080/user/${username}`)
      .then((res) => res.json())
      .then((json) => setUser(json));
  }, [ username]);

  return (
      <>
    <Menu />
    <Wrapper>
   
      {user.success? 
      <>
      <Profile id="" mode={user} />
      <ProfileGameList mode={user} />  </>
      : 
        <NoUser>
            <Text>User doesn't exist. </Text>
            <Text>New Search? </Text>
            <SearchUser mode='expanded'/>
        </NoUser>
     
    }
    </Wrapper>
    </>
  );
};

export default PublicProfile;
