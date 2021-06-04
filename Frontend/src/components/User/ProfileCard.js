import React from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components/macro'
import {Link } from 'react-router-dom'


const Container = styled.div`
display: flex;
flex-direction: column;`


const EditLink = styled(Link)`
width: 100%;
text-align: right;
`

const Edit = styled.div`
width: 30px;
height: 30px;`

const EditImg = styled.img`
filter: invert(46%) sepia(6%) saturate(4126%) hue-rotate(314deg) brightness(84%) contrast(93%);
width: 100%;`

const ImgCard = styled.div`
width: 250px;
height: 500px;
background: #F2D3AC;
border: solid #A65151 3px;
border-right: none;
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
border-radius: 5px  0  0 5px;
margin-top: 50px;
color: #733C3C;`


const ImgContainer= styled.div`
width: 120px;
height: 120px;
background: #F2811D;
display: flex;
justify-content: center;
align-items: center;
border-radius: 5px;
border-radius: 50%;`

const Img = styled.img`
width: 115px;
height: 115px;
border-radius: 50%;
`


const TextContainer = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;`

const Name = styled.h1`
text-align: right;
flex: 1 1 auto;
color: #D94A56;`

const Bold = styled.span`
font-weight: bold;`

const Age = styled.p`
font-weight: bold;
flex: 1 1 auto;`

const Info = styled.p`
margin: 0;
margin-left: 10px;
align-self: flex-start;`

const Cite = styled.div `
padding: 20px 0;
margin-bottom: 20px;
` 

const Description = styled.p`
font-style: italic;`

export const ProfileCard = ({id}) => {
    const profile = useSelector(store => store.user.userInfo)

 return (
   <Container>
     <ImgCard>
     <EditLink to={`/profile/${id}/edit`}> <Edit><EditImg src={require('../../assets/edit.svg')} /></Edit></EditLink>
       <ImgContainer>
         {profile.avatar ? (
           <Img src={require(`../../assets/avatar/${profile.avatar}`)} />
         ) : (
           <></>
         )}
       </ImgContainer>
       <TextContainer>
         <Name> {profile.username} </Name>
         {profile.age ? <Age>lvl {profile.age}</Age> : <></>}{" "}
       </TextContainer>
       <TextContainer>
         {profile.name ? (
           <Info>
             <Bold>Name:</Bold> {profile.name}
           </Info>
         ) : (
           <></>
         )}
         {profile.surname ? <Info>{profile.surname}</Info> : <></>}{" "}
       </TextContainer>
       <TextContainer>
         {profile.e_mail ? (
           <Info>
             <Bold>E-mail:</Bold> {profile.e_mail}
           </Info>
         ) : (
           <></>
         )}
       </TextContainer>
       {profile.description ? (
      <Cite>
       <Description>"{profile.description}"</Description>
      </Cite>
          ) : (
            <></>
          )}
     </ImgCard>

 
   </Container>
 );
}