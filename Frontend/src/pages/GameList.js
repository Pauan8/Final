import React , {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import KeyboardArrowLeftIcon  from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import FirstPageIcon from '@material-ui/icons/FirstPage';

import { LottieAnimation } from '../animation/LottieAnimation';
import loading from 'animation/json/loading.json';
import { Menu } from '../components/Menu'
import { GameCard } from '../components/Games/GameCard';
import { SearchMenu } from '../components/Search/SearchMenu'
import boardGames, { generateGamesList, genereateFilteredGamesList } from 'reducers/boardGames';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 6;
`;

const Title = styled.h1``;

const Page = styled.div`
 display: flex;
 width: 100%;
 max-width: 300px;
 justify-content: space-evenly;
 align-items: center;
 padding-right: 40px;`

const Paging = styled.button`
  cursor: pointer;
  background: transparent;
  height: 30px;
  border-radius: 5px;`

const PageNumber = styled.p``

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

  const arr = type === 'by_filter' ? data.Filtered: data[value]
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

  const generateLists =useCallback(() => {
    if(type === 'by_filter'){
      dispatch(boardGames.actions.setFilter(value));
      dispatch(genereateFilteredGamesList('Filtered', page));
    } else{
      dispatch(generateGamesList(type, value, page));
    }
  }, [dispatch, page, type, value])

  const handleClick = (direction) => {
    if(direction === 'forward'){
      setPage(page + 1)
    } else if(direction === 'back'){
      setPage(page - 1)
    } else {
      setPage(1)
    }
  }

  useEffect(() => {
    generateLists();
  }, [page, generateLists]);
 
  return (
    <Wrapper>
      <Menu />
      <SearchMenu />
      {isLoading?
           <LottieAnimation lotti={loading} height={300} width={300} />
      :
      (<><Title> {setTitle()} </Title>
      <Page>
      <Paging onClick={() => handleClick('start')} disabled={page === 1}> 
        <FirstPageIcon />
      </Paging> 
      <Paging onClick={() => handleClick('back')} disabled={page === 1}> 
          <KeyboardArrowLeftIcon />
        </Paging> 
        <PageNumber>Page: {page}</PageNumber>
        <Paging onClick={() => handleClick('forward')} disabled={arr?arr.length === 0:false}> 
          <KeyboardArrowRightIcon />
        </Paging> 
      </Page>
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
