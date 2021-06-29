import React, { useState } from 'react';
import styled from 'styled-components/macro';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { Search } from '../Reusable/Search';
import { SearchButton } from './SearchButton';
import { RadioButtons } from '../Reusable/RadioButtons';
import categories from '../../data/categories.json';
import mechanics from '../../data/mechanics.json';
import { minAgeArr } from '../../data/choicesArrays';
import { RangeSlider } from './RangeSlider';
import { MultipleSelect } from './MultipleSelect';

const Wrapper = styled.div`
  position: fixed;
  float: right;
  right: 0;
  top: 0;
  z-index: 8;
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

const AdvancedSearch = styled.button`
  background: none;
  border: none;
  width: 70px;
  height: 50px;
  border-radius: 5px;
  margin-left: 10px;
  opacity: 0.5;
  position: absolute;
  right: 0;
  content: '';
  cursor: pointer;

  @media (min-width: 768px) {
    right: 40px;
    margin-top: 10px;
    &::after {
      content: 'Advanced search';
    }

    &:hover,
    &:active,
    &:focus {
      opacity: 1;
    }
  }
`;

const AdvancedSearchIcon = styled.img`
  height: 30px;
  width: 30px;
`;

const SelectContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 300px;
  align-items: center;
`;

const ExpandContainer = styled.div`
  display: flex;
`;

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
    max-width: calc(100vw - 40px);
    width: 375px;
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
  display: ${(props) => (props.expand ? 'block' : 'none')};
  background: white;

  @media (min-width: 768px) {
    display: block;
  }
`;

const RadioContainer = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
  margin: 20px 0;
`;
const RangeContainer = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
  justify-content: center;
  margin: 20px 0;
`;

export const SearchMenu = () => {
  const [expand, setExpand] = useState(false);
  const [value, setValue] = useState({
    categories: [],
    mechanics: [],
    players: [null, null],
    playtime: [null, null],
    minage: [],
    year: [null, null],
  });

  const handleChange = (props) => (event) => {
    setValue({ ...value, [props]: event.target.value });
  };

  return (
    <>
      <Container>
        <Search mode='games' />
        <AdvancedSearch expand={expand} onClick={() => setExpand(!expand)}>
          <AdvancedSearchIcon src={require('../../assets/search-bar.png')} />
        </AdvancedSearch>
      </Container>
      <Wrapper>
        <Form noValidate autoComplete='off'>
          <ExpandContainer>
            <ExpandButton expand={expand} onClick={() => setExpand(!expand)}>
              {expand ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}{' '}
            </ExpandButton>
            <Expand expand={expand}>
              <ExpandInner>
                <SelectContainer>
                  <MultipleSelect
                    array={categories}
                    value={value.categories}
                    handleChange={handleChange('categories')}
                    title='categories'
                  />
                  <MultipleSelect
                    array={mechanics}
                    value={value.mechanics}
                    handleChange={handleChange('mechanics')}
                    title='mechanics'
                  />
                </SelectContainer>
                <RadioContainer>
                  <RadioButtons
                    type='Min age'
                    choices={minAgeArr}
                    value={value.minage}
                    handleChange={handleChange('minage')}
                  />
                </RadioContainer>
                <RangeContainer>
                  <RangeSlider
                    title='players'
                    label='Players'
                    value={value}
                    setValue={setValue}
                    min={1}
                    max={20}
                    step={1}
                  />
                  <RangeSlider
                    title='playtime'
                    label='Play-time(h)'
                    value={value}
                    setValue={setValue}
                    min={0}
                    max={8}
                    step={0.5}
                  />
                  <RangeSlider
                    title='year'
                    label='Year published'
                    value={value}
                    setValue={setValue}
                    min={1900}
                    max={2021}
                    step={1}
                  />
                </RangeContainer>
              </ExpandInner>
              <SearchButton value={value} />
            </Expand>
          </ExpandContainer>
        </Form>
      </Wrapper>
    </>
  );
};
