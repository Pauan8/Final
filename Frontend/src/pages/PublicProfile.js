import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';

import { SearchUser } from '../components/SearchUser'
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

const SearchContainer = styled.div`
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
`

const SearchBar = styled.div`
        width: 250px;
    `


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
      <ProfileCard id="" mode={user} />
      <ProfileGameList mode={user} />  </>
      : <>
        <p>User doesn't exist. </p>
        <p>New Search? </p>
        <SearchContainer>
            <SearchBar>
                <SearchUser mode='expanded'/>
            </SearchBar>
        </SearchContainer>
        </>
    }
    </Wrapper>
    </>
  );
};

export default PublicProfile;
