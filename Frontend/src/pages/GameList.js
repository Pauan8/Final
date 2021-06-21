import React , {useEffect, useState} from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Menu } from '../components/Menu'
import { GameCard } from '../components/Games/GameCard';
import boardGames, { generateGamesList, genereateFilteredGamesList } from 'reducers/boardGames';

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
  const dispatch = useDispatch();
  const {type, value} = useParams();
  const data = useSelector((store) => store.boardGames.gameLists);
  const arr = type === 'by_filter' ? data.Filtered: data[value]

  const setTitle = () => {
    switch(value) {
      case 'popularity':
        return 'Top Rated';
      case 'discount':
        return 'Discounted';
      case '2021':
        return 'New Releases';
      default:
        return 'Search results';
    }
  }

  useEffect(() => {
    if(type === 'by_filter'){
      dispatch(boardGames.actions.setFilter(value));
      dispatch(genereateFilteredGamesList('Filtered'));
    } else{
      dispatch(generateGamesList(type, value));
    }
  }, []);
 
  return (
    <Wrapper>
      <Menu />
      <Title> {setTitle()} </Title>
      <Grid>
        {arr ? (
          arr.map((game) => (
              <GameCard {...game} />
          ))
        ) : (
          <></>
        )}
      </Grid>
    </Wrapper>
  );
};

export default GameList;
