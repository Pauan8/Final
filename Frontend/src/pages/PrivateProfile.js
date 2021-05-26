import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import user, { fetchUser, logout } from 'reducers/user'

const Wrapper = styled.div`
position: relative;`

const Name = styled.h1``

const PrivateProfile = () => {
const history = useHistory();
const dispatch = useDispatch();
const token = useSelector(store => store.user.userInfo.accessToken)

useEffect(() => {
    dispatch(user.actions.setToken(localStorage.getItem('token') ))
    token ?
    dispatch(fetchUser()) :
    history.push("/signup")
    }, [token, dispatch,history])


    const profileInfo = useSelector(store => store.user.userInfo)
    return (
    <Wrapper>
        <Name>{profileInfo.username}</Name>
        <button onClick={() => dispatch(logout())}>Log out</button>
    </Wrapper>)
}

export default PrivateProfile;