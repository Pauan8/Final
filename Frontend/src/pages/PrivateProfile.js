import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchUser, logout } from 'reducers/user'
import { LottieAnimation } from '../animation/LottieAnimation'
import loading from 'animation/json/loading.json'

const Wrapper = styled.div`
position: relative;
display: flex;
min-height: 100vh;
width: 100%;`

const Name = styled.h1``

const PrivateProfile = () => {
const history = useHistory();
const dispatch = useDispatch();
const token = useSelector(store => store.user.accessToken)
const userID = useSelector(store => store.user.userInfo.userID)
const isLoading = useSelector(store => store.ui.isLoading)
console.log(token)

useEffect(() => {
    if(token)
    {
        dispatch(fetchUser(userID))
    } else {
        history.push("/signup")
    }
}, [token, dispatch,history])

const onLogout = () => {
    dispatch(logout())
    history.push("/")
}
    const profileInfo = useSelector(store => store.user.userInfo)
    return (
      <Wrapper>
          {!isLoading ? (
           <Name> {profileInfo.username} </Name>
          ) : (
            <LottieAnimation lotti={loading} height={300} width={300} />
          )}
        <button onClick={onLogout}>Log out</button>
      </Wrapper>
    );
}

export default PrivateProfile;