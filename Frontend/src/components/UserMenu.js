import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

const Wrapper = styled.div`
width: 100%;
display: flex;
position: absolute;
justify-content: flex-end;`

export const UserMenu = () => {
    return <Wrapper><Link to={`/profile/${localStorage.getItem('userID')}`}>CLICK</Link></Wrapper>
}