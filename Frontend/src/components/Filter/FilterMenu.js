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
`

const ExpandContainer = styled.div`
  display: flex;
  height: ${(props) => (props.expand ? '100vh' : '0')};
  overflow-y: ${(props) => (props.expand ? 'auto' : 'hidden')};
  flex-direction: column;
  align-items: center;
  transition: height ease-in-out 1s;
  overflow-y: hidden;

  @media (min-width: 768px){
    height: ${(props) => (props.expand ? '250px' : '0')};
  }
`;

const RadioContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;

    @media (min-width: 768px){
      flex-direction: row;
      width: 700px;
      justify-content: space-evenly;
  }
`

const RadioGroup = styled.div`
margin-bottom: 20px;`

export const FilterMenu = ({ isNew, type, mode }) => {
  const [value, setValue] = useState({
    players: null,
    age: null,
    playtime: null,
    year: null,
  });
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (props) => (e) => {
    setValue({ ...value, [props]: e.target.value });
  };
  let filterArr = []
  const handleFilters = (arr) => {
      if(arr && arr.length > 0){
          console.log("more than 1")
         filterArr.push({[arr[0].name[0]]: arr[0].value[0]}, {[arr[0].name[1]]: arr[0].value[1]});
      } else if(arr) {
        console.log("just 1")
        filterArr.push({[arr[0].name[0]]: arr[0].value[0]});
      }
      
  }

  const handleClick = () => {
        handleFilters(value.players ? playerRange.filter(players => players.index === value.players) : null)
        handleFilters(value.playtime ? playtimeRange.filter(playtime => playtime.index === value.playtime) : null)
        handleFilters(value.age ? ageRange.filter(age => age.index === value.age) : null)
        handleFilters(value.year ? yearRange.filter(year => year.index === value.year): null)
        dispatch(boardGames.actions.setFilter(filterArr));        
        history.push(`/GameList/${type}/${mode}`)
        filterArr= [];
    };

  const renderFilter = () => {
    if (type === 'search') {
      return (
        <RadioContainer>
          {mode.includes('players') ? (
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
          {mode.includes('playtime') ? (
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
          {mode.includes('age') ? (
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
          {isNew || mode.includes('year') ? (
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
    }
    return (
      <RadioContainer>
        <RadioGroup>
            <RadioButtons
            choices={playerRange}
            type='Players'
            value={value.players}
            handleChange={handleChange('players')}
            />
        </RadioGroup>
        <RadioGroup>
            <RadioButtons
            choices={playtimeRange}
            type='Play-time'
            value={value.playtime}
            handleChange={handleChange('playtime')}
            />
        </RadioGroup>
        <RadioGroup>
            <RadioButtons
            choices={ageRange}
            type='Minimum age'
            value={value.age}
            handleChange={handleChange('age')}
            />
        </RadioGroup>
        {isNew ? (
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
        <ButtonContainer>
            <TransparentBtn handleClick={() => setExpand(!expand)} text="Filter" fontSize="14px" />
        </ButtonContainer>
        <ExpandContainer expand={expand}>
            {renderFilter()}
            <Button handleClick={handleClick} size='small' text='Apply' />
      </ExpandContainer>
    </Wrapper>
  );
};
