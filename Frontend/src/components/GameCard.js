/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  height: 400px;
  width: 300px;
  background: #9C8152;
  box-shadow: 2px 2px 5px 4px grey;
  border: solid #75603E 0.3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const ContainerInner = styled.div`
  height: 390px;
  width: 290px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #d7bd8f;
`;

const Title = styled.h1`
  font-size: 18px;
  width: 250px;
  text-align: center;
`;

const ImageContainer = styled.div`
  width: 250px;
  height: 160px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border: solid #75603e 0.5px;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

const Info = styled.p`
  margin: 2px;
`;

const Bold = styled.span`
  font-weight: bold;
`;

export const GameCard = ({
  image_url,
  name,
  year_published,
  min_players,
  max_players,
  min_playtime,
  max_playtime,
  min_age,
  primary_publisher
}) => {
  return (
    <Container>
      <ContainerInner>
        <Title>{name}</Title>
        <ImageContainer>
          <Image src={image_url} />
        </ImageContainer>
        <InfoContainer>
          <Info>
            <Bold>Published: </Bold>
            {year_published} by {primary_publisher.name}
          </Info>
          <Info>
            <Bold>Minimum age: </Bold>
            {min_age} years
          </Info>
          <Info>
            <Bold>Playtime: </Bold>
            {min_playtime}-{max_playtime} minutes
          </Info>
          <Info>
            <Bold>Players: </Bold>
            {min_players}-{max_players} persons
          </Info>
        </InfoContainer>
      </ContainerInner>
    </Container>
  );
};
