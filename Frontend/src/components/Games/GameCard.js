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
  margin: 5px;
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
  const checkValue = (value) => {
    return value || 'unknown';
  };

  const checkMultiples = (val1, val2) => {
    return checkValue(val1) !== checkValue(val2)
      ? `${checkValue(val1)}-${checkValue(val2)}`
      : checkValue(val1);
  };

  return (
    <>
      {name ? (
        <Container>
          <ContainerInner>
            <Title>{name}</Title>
            <ImageContainer>
              <Image src={image_url} />
            </ImageContainer>
            <InfoContainer>
              <Info>
                <Bold>Published (year): </Bold>
                {checkValue(year_published)}
              </Info>
              <Info>
                <Bold>Publisher: </Bold>
                {checkValue(primary_publisher ? primary_publisher.name : null)}
              </Info>
              <Info>
                <Bold>Minimum age (years): </Bold>
                {checkValue(min_age)}
              </Info>
              <Info>
                <Bold>Playtime (mins): </Bold>
                {checkMultiples(min_playtime, max_playtime)}
              </Info>
              <Info>
                <Bold>Players: </Bold>
                {checkMultiples(min_players, max_players)}
              </Info>
            </InfoContainer>
          </ContainerInner>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};
