import React from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'

const Wrapper = styled.div``

const Name = styled.h1``

const Profile = () => {
 const user = useSelector(store => store.user.userInfo)
    return (
    <Wrapper>
        <Name>{user.username}</Name>
    </Wrapper>)
}

export default Profile;