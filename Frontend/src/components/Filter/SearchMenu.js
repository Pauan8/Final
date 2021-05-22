import React, { useState } from 'react';
import styled from 'styled-components/macro';

import test from '../../data/test.json';
import { DropDown } from './DropDown';
import { Search } from './Search';
import { RadioButtons } from './RadioButtons';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  flex-direction: column;
`;

const Form = styled.div`
display: flex;
flex-direction: column;
padding: 20px 0;
flex: 1 1 auto;
max-width: 375px;
height: 100%;
justify-content: space-evenly;
align-items: center;

@media (min-width: 1024px){
    max-width: 100%;
}`;

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
`
const SelectContainer = styled.div`
margin-top: 10px;
display: flex;
width: 300px;
justify-content: center;

@media (min-width: 1024px){
    flex-direction: column;}`

const Expand = styled.div`
  position: relative;
  box-shadow: 3px 3px 2px 2px grey;
  align-items: center;
  display: flex;
  visibility: hidden;
  flex-direction: column;
  align-items: center;
  height: 0;
  overflow-y: hidden;
  border: solid lightgrey 0.1px;
  transition: height 2s ease-out;

  ${(props) => props.expand && `
    height: calc(400px);
    overflow-y: auto;
    visibility: visible;
  `};

@media (min-width: 1024px){
    flex-direction: row;
    
    ${(props) => props.expand && `
    height:200px;
    `};
}`

const ExpandButton = styled.button`
position: relative;
`

const RadioContainer = styled.div`
display: grid;
justify-content: center;
margin: 20px 0;
grid-template-columns: repeat(2, 45%);
grid-row-gap: 20px;

@media (min-width: 1024px){
    grid-template-columns: repeat(4, 1fr);}
    `

export const SearchMenu = () => {
  const [expand, setExpand] = useState(false)
  return (
    <Wrapper>
      <Form noValidate autoComplete="off">
        <Container>
          <Search />
        </Container>
        <ExpandButton onClick={() => setExpand(!expand)}> Filter </ExpandButton>
        <Expand expand={expand}>
          <SelectContainer>
            <DropDown arr={test.categories} />
            <DropDown arr={test.categories} />
          </SelectContainer>
          <RadioContainer>
            <RadioButtons />
            <RadioButtons />
            <RadioButtons />
            <RadioButtons />
          </RadioContainer>
        </Expand>
      </Form>
    </Wrapper>
  );
};
