/* eslint-disable no-loop-func */
import React, { useState } from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.div`
display: flex;
width: 100%;
z-index: 5;
padding: 10px 0;
justify-content: center;
`

const ContainerOuter = styled.div`
display: ${(props) => (props.index === props.slideIndex ? 'flex' : 'none')};
width: 100%;

@media (min-width: 768px) {
    width: 300px;
}

@media (min-width: 1024px) {
    width: 600px;
}
`

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 200px; 
width: 100%;
background: #b9cdd8;
z-index: 5;
margin: 3px;
box-shadow: 2px 2px 2px 2px gray;
padding: 0 10px;
flex: 1 1 auto;
border-style: solid;
border-color: #9BB7C7;
border-width: 0.5px;
`

const Title = styled.h1`
color: white;
font-family: "Raleway", sans-serif;
max-width: 100%;
word-break: keep-all;
font-size: 20px;`

const Button = styled.button`
z-index: 5;
background: transparent;
border: none;
border-radius: 10px;
height: 20%;
align-self: center;
color: lightslategray;
text-shadow: 2px 2px lightgray;
padding:5px;
margin: 3px 0;

&:hover {
    font-size: 1.1em;
    padding: 3px;
    color: darkslategrey;
}
`
let slideNumber = 0;
export const Slideshow = ({ data }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const resultsRender = [];

  const handleClick = (direction, jump) => {
    if (direction === 'left') {
      return slideIndex === 0
        ? setSlideIndex(data.length - 1)
        : setSlideIndex(slideIndex - jump);
    } else {
      return slideIndex === data.length - 1
        ? setSlideIndex(0)
        : setSlideIndex(slideIndex + jump);
    }
  };

  // used to be able to display 3 slides at a time on bigger screens
  // and 1 at smaller
  if (window.innerWidth > 1024) {
    slideNumber = 3;
  } else {
    slideNumber = 1;
  }
  for (let i = 0; i < data.length; i += slideNumber) {
    resultsRender.push(
      <ContainerOuter index={i} slideIndex={slideIndex}>
        <Button onClick={() => handleClick('left', slideNumber)}> ◀ </Button>
        {data.slice(i, i + slideNumber).map((item) => (
          <Container>
            <Title>{item.name.replace('/', '/ ')}</Title>
          </Container>
        ))}
        <Button onClick={() => handleClick('rigth', slideNumber)}> ▶ </Button>
      </ContainerOuter>
    );
  }

  return (
    <Wrapper>
      {resultsRender}
    </Wrapper>
  );
};
