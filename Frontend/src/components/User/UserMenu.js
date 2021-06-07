import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SvgIcon from '@material-ui/core/SvgIcon';

const Wrapper = styled.div`
width: 100%;
display: flex;
position: absolute;
justify-content: flex-end;`

const ProfileLink = styled(Link)`
color: #608BA6;

&:hover {
    color: #011C40;
}
&:active {
    color: #011C40;
}
`

export const UserMenu = () => {
    const userID = useSelector(store => store.user.userInfo.userID)
    
    return <Wrapper><ProfileLink to={`/profile/${userID}`}><AccountCircleIcon style={{ fontSize: 50 }}/></ProfileLink></Wrapper>
}