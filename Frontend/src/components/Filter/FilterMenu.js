import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { playerRange } from 'data/choicesArrays';
import { ageRange } from 'data/choicesArrays';
import { playtimeRange } from 'data/choicesArrays';
import { yearRange } from 'data/choicesArrays';
import { RadioButtons } from 'components/Reusable/RadioButtons';
import { Button } from 'components/Reusable/Button';
import { TransparentBtn } from 'components/Reusable/TransparentBtn';
import boardGames from 'reducers/boardGames';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid gray 0.5px;
  width: 100px;
  border-radius: 5px;
`;

const ExpandContainer = styled.div`
  display: flex;
  height: ${(props) => (props.expand ? '100vh' : '0')};
  overflow-y: ${(props) => (props.expand ? 'auto' : 'hidden')};
  flex-direction: column;
  align-items: center;
  transition: height ease-in-out 1s;
  overflow-y: hidden;

  @media (min-width: 768px) {
    height: ${(props) => (props.expand ? '250px' : '0')};
  }
`;

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    width: 700px;
    justify-content: space-evenly;
  }
`;

const RadioGroup = styled.div`
  margin-bottom: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  width: 300px;
`;

const Text = styled.p`
  display: flex;
`;

const ButtonGroup = styled.div`
  display: ${(props) => (props.hide ? 'none' : 'flex')};
  width: 250px;
  padding: 10px;
  justify-content: space-between;
`;

export const FilterMenu = ({ isNew, type, mode }) => {
  const [value, setValue] = useState({
    players: null,
    age: null,
    playtime: null,
    year: null,
  });
  const [expand, setExpand] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  let searchString;

  const handleChange = (props) => (e) => {
    setValue({ ...value, [props]: e.target.value });
  };

  let filterArr = [];
  const handleFilters = (type, arr) => {
    if (type && arr[0].value.length > 1) {
      filterArr.push(
        { [arr[0].name[0]]: arr[0].value[0] },
        { [arr[0].name[1]]: arr[0].value[1] }
      );
    } else if (type) {
      filterArr.push({ [arr[0].name[0]]: arr[0].value[0] });
    }
  };

  const handleClick = () => {
    handleFilters(
      value.players,
      playerRange.filter((players) => players.index === value.players)
    );
    handleFilters(
      value.playtime,
      playtimeRange.filter((playtime) => playtime.index === value.playtime)
    );
    handleFilters(
      value.age,
      ageRange.filter((age) => age.index === value.age)
    );
    handleFilters(
      value.year,
      yearRange.filter((year) => year.index === value.year)
    );
    dispatch(boardGames.actions.setFilter(filterArr));

    history.push(`/GameList/${type}/${mode}`);
    setExpand(false);
    filterArr = [];
  };

  const handleClear = () => {
    setValue('');
  };

  const emptyState = () => {
    if (mode.includes('year', 'age', 'playtime', 'players')) {
      if (hideButton === false) {
        setHideButton(true);
      }
      return (
        <TextContainer>
          <Text>
            You already filtered on all available options in your search. Please
            do a new advanced search for new results.
          </Text>
        </TextContainer>
      );
    }
  };

  const renderFilter = () => {
    if (type === 'search') {
      searchString = mode;
    } else {
      searchString = ' ';
    }
    return (
      <RadioContainer>
        {searchString.includes('players') ? (
          <></>
        ) : (
          <RadioGroup>
            <RadioButtons
              choices={playerRange}
              type='Players'
              value={value.players}
              handleChange={handleChange('players')}
            />
          </RadioGroup>
        )}
        {searchString.includes('playtime') ? (
          <></>
        ) : (
          <RadioGroup>
            <RadioButtons
              choices={playtimeRange}
              type='Play-time'
              value={value.playtime}
              handleChange={handleChange('playtime')}
            />
          </RadioGroup>
        )}
        {searchString.includes('age') ? (
          <></>
        ) : (
          <RadioGroup>
            <RadioButtons
              choices={ageRange}
              type='Minimum age'
              value={value.age}
              handleChange={handleChange('age')}
            />
          </RadioGroup>
        )}
        {isNew || searchString.includes('year') ? (
          <></>
        ) : (
          <RadioGroup>
            <RadioButtons
              choices={yearRange}
              type='Publish year'
              value={value.year}
              handleChange={handleChange('year')}
            />
          </RadioGroup>
        )}
      </RadioContainer>
    );
  };

  return (
    <Wrapper>
      <ButtonContainer onClick={() => setExpand(!expand)}>
        <TransparentBtn text={expand ? '^' : 'Filter'} fontSize='14px' />
      </ButtonContainer>
      <ExpandContainer expand={expand}>
        {renderFilter()}
        {emptyState()}
        <ButtonGroup hide={hideButton}>
          <Button handleClick={handleClick} size='small' text='Apply' />
          <Button handleClick={handleClear} size='small' text='Clear' />
        </ButtonGroup>
      </ExpandContainer>
    </Wrapper>
  );
};
