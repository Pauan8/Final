import React , {useEffect, useState} from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { LottieAnimation } from '../animation/LottieAnimation';
import loading from 'animation/json/loading.json';
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

const Page = styled.div`
 display: flex;
 width: 100%;
 justify-content: space-evenly;
 align-items: center;`

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
  const [page, setPage] = useState(0)

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

  const generateLists =() => {
    if(type === 'by_filter'){
      dispatch(boardGames.actions.setFilter(value));
      dispatch(genereateFilteredGamesList('Filtered', page));
    } else{
      dispatch(generateGamesList(type, value, page));
    }
  }

  const handleClick = (direction) => {
    if(direction === 'forward'){
      setPage(page + 1)
    } else {
      setPage(page - 1)
    }
  }

  useEffect(() => {
    generateLists();
  }, [page]);
 
  return (
    <Wrapper>
      <Menu />
      {isLoading?
           <LottieAnimation lotti={loading} height={300} width={300} />
      :
      (<><Title> {setTitle()} </Title>
      <Page>
        <Paging onClick={() => handleClick('back')} disabled={page === 0}> 
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
              <GameCard {...game} />
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
