import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchUser, logout } from 'reducers/user'
import { LottieAnimation } from '../animation/LottieAnimation'
import loading from 'animation/json/loading.json'
import { ProfileCard } from '../components/User/ProfileCard'
import { ProfileGameList } from '../components/User/ProfileGameList'

const Wrapper = styled.div`
position: relative;
display: flex;
flex-direction: column;
min-height: 100vh;
width: 100%;
align-items: center;

@media (min-width: 1024px){
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
}`

const PrivateProfile = () => {
const { id } = useParams();
const history = useHistory();
const dispatch = useDispatch();
const token = useSelector(store => store.user.accessToken)
const isLoading = useSelector(store => store.ui.isLoading)

useEffect(() => {
    if(token)
    {
        dispatch(fetchUser())
    } else {
        history.push("/signup")
    }
}, [token, dispatch,history])

const onLogout = () => {
    dispatch(logout())
    history.push("/")
}
    
    return (
      <Wrapper>
          {!isLoading ? (
            <>
              <ProfileCard id={id}/>
              <ProfileGameList />
            </>
          ) : (
            <LottieAnimation lotti={loading} height={300} width={300} />
          )}
        <button onClick={onLogout}>Log out</button>
      </Wrapper>
    );
}

export default PrivateProfile;