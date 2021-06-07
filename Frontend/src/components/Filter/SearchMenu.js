import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { DropDown } from '../Reusable/DropDown';
import { Search } from './Search';
import { SearchButton } from './SearchButton'
import { RadioButtons } from './RadioButtons';
import categories from '../../data/categories.json'
import mechanics from '../../data/mechanics.json'
import {playersArr, playtimeArr, minAgeArr, yearsArr} from '../../data/choicesArrays'

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
  display: flex;
  visibility: hidden;
  flex-direction: column;
  align-items: center;
  height: 0;
  overflow-y: hidden;
  border: solid lightgrey 0.1px;
  transition: height 2s ease-out;

  ${(props) => props.expand && `
    height: 500px;
    overflow-y: auto;
    visibility: visible;
  `};

@media (min-width: 1024px){
    
    ${(props) => props.expand && `
    height:250px;
    `};
}`

const ExpandInner = styled.div`
display: flex;
flex-direction: column;
  align-items: center; 
  
  @media (min-width: 1024px){
    flex-direction: row;
  }`

const ExpandButton = styled.button`
position: relative;
width: 100%;
border: solid lightgrey 0.1px;
background: transparent;

&:before {
  ${(props) => props.expand? `content: "△"`: `content: "▽"`}}
`

const RadioContainer = styled.div`
display: grid;
justify-content: center;
margin: 20px 0;
grid-template-columns: repeat(2, 60%);
grid-row-gap: 20px;

@media (min-width: 1024px){
    grid-template-columns: repeat(4, 1fr);}
    grid-column-gap: 60px;
    padding-right: 60px;
    `

export const SearchMenu = () => {
  const [expand, setExpand] = useState(false)
  const [value, setValue] =  useState({
    categories: '',
    mechanics: '',
    players: '',
    playtime: '',
    minage: '',
    year: ''
  })

  const handleChange = (props) => (event) => {
    setValue({...value, [props]: event.target.value });
  };

  return (
    <Wrapper>
      <Form noValidate autoComplete="off">
        <Container>
          <Search />
        </Container>
        <ExpandButton expand={expand} onClick={() => setExpand(!expand)}> </ExpandButton>
          <Expand expand={expand}>
            <ExpandInner>
            <SelectContainer>
              <DropDown arr={categories} value={value.category} handleChange={handleChange('category')} title="categories" />
              <DropDown arr={mechanics} value={value.mechanic} handleChange={handleChange('mechanic')} title="mechanics" />
            </SelectContainer>
            <RadioContainer>
              <RadioButtons type="Players" choices={playersArr} value={value.players} handleChange={handleChange('players')}/>
              <RadioButtons type="Play-time (mins)" choices={playtimeArr} value={value.playtime}  handleChange={handleChange('playtime')}/>
              <RadioButtons type="Min age" choices={minAgeArr} value={value.minage} handleChange={handleChange('minage')}/>
              <RadioButtons type="Release year" choices={yearsArr} value={value.year} handleChange={handleChange('year')}/>
            </RadioContainer>
            </ExpandInner>
          <SearchButton value={value}/>
        </Expand>
      </Form>
    </Wrapper>
  );
};
