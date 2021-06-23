/* eslint-disable no-loop-func */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { generateGamesList } from '../../reducers/boardGames';
import { GameCard } from './GameCard';
import { LottieAnimation } from '../../animation/LottieAnimation';
import loading from '../../animation/json/loading.json';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0;
  justify-content: center;
  position: relative;
`;

const ContainerOuter = styled.div`
  display: none;
  width: 100%;
  justify-content: center;

  &:nth-of-type(${(props) => props.slideIndex}) {
    display: flex;
  }
  @media (min-width: 768px) {
    width: fit-content;
  }

  @media (min-width: 1024px) {
    width: fit-content;
  }
`;

const Button = styled.button`
  background: transparent;
  border: none;
  border-radius: 10px;
  height: 20%;
  align-self: center;
  color: lightslategray;
  text-shadow: 2px 2px lightgray;
  padding: 5px;
  margin: 3px 0;

  &:hover {
    font-size: 1.1em;
    padding: 3px;
    color: darkslategrey;
  }
`;
let slideNumber = 0;
export const Slideshow = ({ type, value }) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const resultsRender = [];
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.ui.isLoading);
  const data = useSelector((store) => store.boardGames.gameLists);

  useEffect(() => {
    return type ? dispatch(generateGamesList(type, value)) : null;
  }, [dispatch, type, value]);

  const handleClick = (direction, jump) => {
    if (direction === 'left') {
      return slideIndex === 1
        ? setSlideIndex(Math.ceil(data[value].length / jump))
        : setSlideIndex((prev) => prev - 1);
    } else {
      return slideIndex === Math.ceil(data[value].length / jump)
        ? setSlideIndex(1)
        : setSlideIndex((prev) => prev + 1);
    }
  };

  const renderLists = () => {
    // used to be able to display 3 slides at a time on bigger screens
    // and 1 at smaller
    if (window.innerWidth >= 1024 && window.innerWidth < 1500) {
      slideNumber = 2;
    } else if (window.innerWidth >= 1500) {
      slideNumber = 3;
    } else {
      slideNumber = 1;
    }
    if (data[value]) {
      console.log(Math.floor(data[value].length / slideNumber));
      for (let i = 0; i < data[value].length; i += slideNumber) {
        resultsRender.push(
          <ContainerOuter index={i} slideIndex={slideIndex} key={`${i}A`}>
            <Button onClick={() => handleClick('left', slideNumber)}>◀</Button>
            {data[value].slice(i, i + slideNumber).map((item) => (
              <GameCard key={item.id} {...item} />
            ))}
            <Button onClick={() => handleClick('right', slideNumber)}>▶</Button>
          </ContainerOuter>
        );
      }

      return <Wrapper>{resultsRender}</Wrapper>;
    } else {
      return <></>;
    }
  };

  return (
    <Wrapper>
      {!isLoading ? (
        renderLists()
      ) : (
        <LottieAnimation lotti={loading} height={300} width={300} />
      )}
    </Wrapper>
  );
};
