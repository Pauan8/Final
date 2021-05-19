import React, { useState } from 'react'
import styled from 'styled-components/macro'

import test from '../data/test.json'

const Wrapper = styled.div`
display: flex;
width: 100%;
height: 100vh;
z-index: 5;
`

const Container = styled.div`
display: ${(props) => (props.index === props.slideIndex ? 'flex' : 'none')};
justify-content: space-between;
align-items: center;
height: 200px; 
width: 100%;
background: darkslategrey;
z-index: 5;
`

const Title = styled.h1`
color: white;`

const Button = styled.button`
z-index: 5;
`

export const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === 'left') {
      return slideIndex === 0
        ? setSlideIndex(test.categories.length - 1)
        : setSlideIndex(slideIndex - 1);
    } else {
      return slideIndex === test.categories.length - 1
        ? setSlideIndex(0)
        : setSlideIndex(slideIndex + 1);
    }
  };

  return (
    <Wrapper>
      {test.categories.map((cat, i) => (
        <Container index={i} slideIndex={slideIndex}>
          <Button onClick={() => handleClick('left')}> {'<'} </Button>
          <Title>{cat.name}</Title>
          <Button onClick={() => handleClick('lrigth')}> {'>'} </Button>
        </Container>
      ))}
    </Wrapper>
  );
};