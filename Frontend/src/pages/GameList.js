import React from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom'

import { GameCard } from '../components/GameCard';
import test2 from '../data/test2.json';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 6;
`;

const Title = styled.h1``;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    max-width: 1000px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const GameList = () => {
  const { type } = useParams();
  return (
    <Wrapper>
      <Title> {type.replace(/([A-Z])/g, ' $1').trim()} </Title>
      <Grid>
        {test2.games.map((game) => (
          <GameCard {...game} />
        ))}
      </Grid>
    </Wrapper>
  );
};

export default GameList;
