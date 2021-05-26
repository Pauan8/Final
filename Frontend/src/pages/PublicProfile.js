import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useHistory, useParams  } from 'react-router-dom'

const Wrapper = styled.div`
position: relative;`

const Name = styled.h1``

const PublicProfile = () => {
    const [user, setUser] = useState([])
    const { username } = useParams();


useEffect(() => {
    fetch(`https://secure-escarpment-13722.herokuapp.com/profile/${username}`)
    .then(res => res.json())
    .then(json => setUser(json))
}, [fetch])

    return (
    <Wrapper>
        <Name>{user.username}</Name>
    </Wrapper>)
}

export default PublicProfile;