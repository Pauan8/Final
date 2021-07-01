import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import PeopleIcon from '@material-ui/icons/People';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useDispatch } from 'react-redux';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { FriendsList } from '../User/FriendsList'
import { handleFriend } from '../../reducers/user'
import { Message } from '../User/Message'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TabContainer = styled.div`
  display: flex;
  width: 340px;
  justify-content: flex-end;
  position: absolute;
  top: 50px;
`

const Tab = styled.button`
  height: 40px;
  width: 40px;
  background: ${props  => props.visible === props.name? '#F2D3AC' : 'transparent'};
  border: solid #a65151 0.5px;
  margin-bottom: -2px;`

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

export const ProfileCard = ({ id, mode }) => {
  const [visibleLayer, setVisibleLayer] = useState('profile');
  const user = useSelector((store) => store.user.userInfo);
  const profile = mode === 'private' ? user : mode;
  const dispatch = useDispatch();

  return (
    <Container>
      <TabContainer>
        <Tab
          onClick={() => setVisibleLayer('profile')}
          name='profile'
          visible={visibleLayer}
        >
          <AccountCircleIcon />
        </Tab>
        <Tab
          onClick={() => setVisibleLayer('friends')}
          name='friends'
          visible={visibleLayer}
        >
          <PeopleIcon />
        </Tab>
      </TabContainer>
      <FriendsList
        friends={profile.friends}
        visibleLayer={visibleLayer}
        mode={mode}
      />
      <ImgCard visible={visibleLayer}>
        {mode === 'private' ? (
          <EditLink to={`/profile/${id}/edit`}>
            <Edit>
              <EditIcon />
            </Edit>
          </EditLink>
        ) : (
          <Button onClick={() => dispatch(handleFriend(profile._id, "add"))}>
            <PersonAddIcon />
          </Button>
        )}
        <ImgContainer>
          {profile.avatar ? (
            <Img src={require(`../../assets/avatar/${profile.avatar}`)} />
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
         <Message />
      </ImgCard>
    </Container>
  );
};
