import React , {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { LottieAnimation } from '../animation/LottieAnimation';
import loading from 'animation/json/loading.json';
import { Menu } from '../components/Menu'
import { GameCard } from '../components/Games/GameCard';
import { SearchMenu } from '../components/Search/SearchMenu'
import boardGames, { generateGamesList, genereateSearchList, filterList } from 'reducers/boardGames';
import { Pagination } from 'components/Reusable/Pagination';
import { FilterMenu } from 'components/Filter/FilterMenu'

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
  const isLoading = useSelector((store) => store.ui.isLoading);
  const hasFilter = useSelector((store) => store.boardGames.filters[0])

  console.log(hasFilter.length)
  const arr = type === 'search' ? data.search: data[value]
  const [page, setPage] = useState(1)

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

  const generateLists = useCallback(() => {
    if (hasFilter.length && hasFilter.length > 0){
      dispatch(filterList(type, value, 1))
    }
    else if(type === 'search'){
      dispatch(boardGames.actions.setSearchString(value));
      dispatch(genereateSearchList(type, page));
    } else {
      dispatch(generateGamesList(type, value, page));
    }
  }, [dispatch, page, type, value, hasFilter])


  useEffect(() => {
    generateLists();
  }, [page, generateLists]);
 
  return (
    <Wrapper>
      <Menu />
      <SearchMenu />
      <FilterMenu mode={value} type={type} isNew={value === '2021' ? true : false}/>
      {isLoading?
           <LottieAnimation lotti={loading} height={300} width={300} />
      :
      (<><Title> {setTitle()} </Title>
      <Pagination setPage={setPage} page={page} arr={arr} />
      <Grid>
        {arr && arr.length > 0 ? (
          arr.map((game) => (
              <GameCard key = {game.id} {...game} />
          ))
        ) : (
          <p>No more results</p>
        )}
      </Grid>
      </>)}
    </Wrapper>
  );
};

export default GameList;
