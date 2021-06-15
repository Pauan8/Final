/* eslint-disable camelcase */
import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { SaveGame } from './SaveGame';
import { LikeButton } from './LikeButton';

const ContainerInner = styled.div`
  height: 390px;
  width: 290px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f2d3ac;
  color: #733c3c;
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
  border: solid #733c3c 0.5px;
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

const FlipCard = styled.div`
  position: relative;
  background: transparent;
  height: 400px;
  width: 300px;
  border: 1px solid #f1f1f1;
  margin: 5px;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
`;

/* This container is needed to position the front and back side */
const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${(props) => (props.flip ? 'rotateY(180deg)' : '')};
`;

/* Position the front and back side */

const FlipCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  background: #a65151;
  color: white;
  transform: rotateY(180deg);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlipCardFront = styled.div`
  background: #a65151;
  border: solid #733c3c 0.3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: black;
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
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
  primary_publisher,
  id,
}) => {
  const [flip, setFlip] = useState(false);
  const [like, setLike] = useState('none');
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
      {id ? (
        <FlipCard>
          <FlipCardInner flip={flip}>
            <FlipCardFront>
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
                    {checkValue(
                      primary_publisher ? primary_publisher.name : null
                    )}
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
                  <LikeButton
                    handleClick={() => setFlip(!flip)}
                    id={id}
                    like={like}
                    setLike={setLike}
                  />
                </InfoContainer>
              </ContainerInner>
            </FlipCardFront>
            <FlipCardBack>
              <SaveGame
                name={name}
                id={id}
                setFlip={setFlip}
                like={like}
                setLike={setLike}
              />
            </FlipCardBack>
          </FlipCardInner>
        </FlipCard>
      ) : (
        <></>
      )}
    </>
  );
};
