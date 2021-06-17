import React , {useEffect } from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Menu } from '../components/Menu'
import { GameCard } from '../components/Games/GameCard';
import boardGames, { genereateFilteredGamesList } from 'reducers/boardGames';

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

  const FilteredGameList = () => {
    const dispatch = useDispatch();
    const { searchstring } = useParams();
    const data = useSelector((store) => store.boardGames.gameLists);
    const arr = data.Filtered;
    
    useEffect(() => {
        dispatch(boardGames.actions.setFilter( searchstring ));
        dispatch(genereateFilteredGamesList( 'Filtered'));
    }, [])

    return (
        <Wrapper>
          <Menu />
          <Title> Filtered </Title>
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

  export default FilteredGameList;