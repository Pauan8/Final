import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

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
  border: solid #a65151 3px;
 border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
 
  margin-top: 50px;
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
  text-align: right;
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

export const ProfileCard = ({ id }) => {
  const profile = useSelector((store) => store.user.userInfo);

  return (
    <Container>
      <ImgCard>
        <EditLink to={`/profile/${id}/edit`}>
          {" "}
          <Edit>
            <EditIcon />
          </Edit>
        </EditLink>
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
};
