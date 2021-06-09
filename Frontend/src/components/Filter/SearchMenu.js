import React, { useState } from "react";
import styled from "styled-components/macro";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { DropDown } from "../Reusable/DropDown";
import { Search } from "./Search";
import { SearchButton } from "./SearchButton";
import { RadioButtons } from "./RadioButtons";
import categories from "../../data/categories.json";
import mechanics from "../../data/mechanics.json";
import {
  playersArr,
  playtimeArr,
  minAgeArr,
  yearsArr,
} from "../../data/choicesArrays";
import { RangeSlider } from './RangeSlider'
import { MultipleSelect } from './MultipleSelect'

const Wrapper = styled.div`
  position: fixed;
  float: right;
  right: 0;
  top: 0;
  z-index: 8;
  width: 300px;
  display: flex;
  align-items: center;
  flex: 1 1 auto;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  align-items: flex-end;

  @media (min-width: 1024px) {
    max-width: 100%;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ShowFilter = styled.button `
  background: none;
  border: ${props => props.expand? "none": "solid lightgrey 0.2px"};
  width: 50px;
  height: 30px;
  border-radius: 5px;
  margin-left:10px;`

const SelectContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 300px;
  align-items: center;
`;

const ExpandContainer = styled.div`
  display: flex;
`

const Expand = styled.div`
  position: relative;
  display: flex;

  background: white;
  flex-direction: column;
  align-items: center;
  width: 0;
  height: 100vh;
  overflow-y: hidden;
  border: solid lightgrey 0.1px;
  border-left: none;
  transition: width 2s ease-in-out;

  ${(props) =>
    props.expand &&
    `
    width: 300px;
    overflow-y: auto;

  `};
  `;

const ExpandInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const ExpandButton = styled.button`
  position: relative;
  width: 40px;
  border: solid lightgrey 0.1px;
  border-right: none;
  background: white;
`;

const RadioContainer = styled.div`
  display: grid;
  justify-content: center;
  margin: 20px 0;
  grid-template-columns: repeat(1, 100%);
  grid-row-gap: 20px;
`;

export const SearchMenu = () => {
  const [expand, setExpand] = useState(false);
  const [value, setValue] = useState({
    categories: [],
    mechanics: [],
    players: "",
    playtime: "",
    minage: "",
    year: "",
  });

  const handleChange = (props) => (event) => {
    setValue({ ...value, [props]: event.target.value });
  };

  return (<>
    <Container>
    <Search />
    <ShowFilter expand={expand} onClick={() => setExpand(!expand)}>{expand?"":"filter"}</ShowFilter>
  </Container>
    <Wrapper>
    
      <Form noValidate autoComplete="off">
        <ExpandContainer> 
        <ExpandButton expand={expand} onClick={() => setExpand(!expand)}>
          {expand ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}{" "}
        </ExpandButton>
        <Expand expand={expand}>
          <ExpandInner>
            <SelectContainer>
              <MultipleSelect array={categories} value={value.categories}  handleChange={handleChange('categories')} title="categories"/>
              <MultipleSelect   array={mechanics} value={value.mechanics} handleChange={handleChange('mechanics')} title="mechanics"/>
       {/*        <DropDown
                arr={categories}
                value={value.category}
                handleChange={handleChange("category")}
                title="categories"
              />
              <DropDown
                arr={mechanics}
                value={value.mechanic}
                handleChange={handleChange("mechanic")}
                title="mechanics"
              /> */}
            </SelectContainer>
            <RadioContainer>
     {/*          <RadioButtons
                type="Players"
                choices={playersArr}
                value={value.players}
                handleChange={handleChange("players")}
              />
              <RadioButtons
                type="Play-time (mins)"
                choices={playtimeArr}
                value={value.playtime}
                handleChange={handleChange("playtime")}
              />
              <RadioButtons
                type="Min age"
                choices={minAgeArr}
                value={value.minage}
                handleChange={handleChange("minage")}
              />
              <RadioButtons
                type="Release year"
                choices={yearsArr}
                value={value.year}
                handleChange={handleChange("year")}
              /> */}
             
                  <RangeSlider />
                  <RangeSlider />
                  <RangeSlider />
            </RadioContainer>
        
          </ExpandInner>
          <SearchButton value={value} />
        </Expand>
        </ExpandContainer> 
      </Form>
</Wrapper>
</>
  );
};
