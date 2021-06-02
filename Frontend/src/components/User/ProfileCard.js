import React from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components/macro'

const Name = styled.h1``

const ImgCard = styled.div`
width: 200px;
height: 300px;
background: brown;
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;`


const ImgContainer= styled.div`
width: 100px;
height: 100px;
background: black;`

const Img = styled.img`
width: 100%;
`
const Age = styled.p``

export const ProfileCard = ({username, avatar, age}) => {
    const profile = useSelector(store => store.user.userInfo)

 return (<ImgCard>
    <ImgContainer>
    <Img src={require(`../../assets/avatar/${profile.avatar}`)} />
    </ImgContainer>
    <Name> {profile.username} </Name>
    {profile.age? <Age>{profile.age}</Age>: <></>} 
    </ImgCard>)   
}