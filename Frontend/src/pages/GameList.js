import React from 'react';
import styled from 'styled-components/macro';
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { GameCard } from '../components/GameCard';
import { fetchSingleGame } from '../reducers/boardGames'

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
let arr = [];
const GameList = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((store) => store.boardGames.gameLists)

  if (type === 'TopRated') {
    arr = data.popularity
  } else if (type === 'Discounted') {
    arr = data.discount
  } else {
    // eslint-disable-next-line prefer-destructuring
    arr = data[2021]
  }

  return (
    <Wrapper>
      <Title> {type.replace(/([A-Z])/g, ' $1').trim()} </Title>
      <Grid>
        {arr.map((game) => (
          <Link
            to={`/Game/${game.id}`}
            onClick={() => dispatch(fetchSingleGame(game.id))}>
            <GameCard {...game} />
          </Link>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default GameList;
