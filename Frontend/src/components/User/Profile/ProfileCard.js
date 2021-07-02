import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';

import { handleFriend } from '../../../reducers/user'


const EditLink = styled(Link)`
  width: 100%;
  text-align: right;
  color: #a65151;
`;

const Edit = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: #a65151 solid;

  &:hover {
    background: #f2811d;
  }
  &:active {
    background: #f2811d;
  }
`;

const ImgCard = styled.div`
  width: 300px;
  height: 500px;
  background: #f2d3ac;
  border: solid #a65151 1px;
  border-radius: 5px;
  display: ${props => props.visible === 'profile' ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;

  margin-top: 89px;
  color: #733c3c;

  @media (min-width: 768px) {
    border-right: none;
    border-radius: 5px 0 0 5px;
  }
`;

const ImgContainer = styled.div`
  width: 120px;
  height: 120px;
  background: #f2811d;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border-radius: 50%;
`;

const Img = styled.img`
  width: 115px;
  height: 115px;
  border-radius: 50%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Name = styled.h1`
  text-align: ${(props) => (props.age ? 'right' : 'center')};
  flex: 1 1 auto;
  color: #d94a56;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const Age = styled.p`
  font-weight: bold;
  flex: 1 1 auto;
`;

const Info = styled.p`
  margin: 0;
  margin-left: 10px;
  align-self: flex-start;
`;

const Cite = styled.div`
  padding: 20px 0;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-style: italic;
`;

const Button = styled.button`
  background: transparent;
  align-self: flex-start;
`;


export const ProfileCard = ({id, visibleLayer, mode, profile}) => {
    const dispatch = useDispatch();
 
return (
    <ImgCard visible={visibleLayer} >
    {mode === 'private' ? (
      <EditLink to={`/profile/${id}/edit`}>
        <Edit>
          <EditIcon />
        </Edit>
      </EditLink>
    ) : (
      <Button onClick={() => dispatch(handleFriend(profile.userID, 'add'))}>
        <PersonAddIcon />
      </Button>
    )}
    <ImgContainer>
      {profile.avatar ? (
        <Img src={require(`../../../assets/avatar/${profile.avatar}`)} />
      ) : (
        <AccountCircleIcon style={{ fontSize: 150 }} />
      )}
    </ImgContainer>
    <TextContainer>
      <Name age={profile.age ? true : false}> {profile.username} </Name>
      {profile.age ? <Age>lvl {profile.age}</Age> : <></>}
    </TextContainer>
    <TextContainer>
      {profile.name ? (
        <Info>
          <Bold>Name:</Bold> {profile.name}
        </Info>
      ) : (
        <></>
      )}
      {profile.surname ? <Info>{profile.surname}</Info> : <></>}
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
        <Description>'{profile.description}'</Description>
      </Cite>
    ) : (
      <></>
    )}
  </ImgCard>
    )
}