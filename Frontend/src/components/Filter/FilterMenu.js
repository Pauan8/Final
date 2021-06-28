import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { playerRange } from 'data/choicesArrays';
import { ageRange } from 'data/choicesArrays';
import { playtimeRange } from 'data/choicesArrays';
import { yearRange } from 'data/choicesArrays';
import { RadioButtons } from 'components/Reusable/RadioButtons';
import { Button } from 'components/Reusable/Button';
import { TransparentBtn } from 'components/Reusable/TransparentBtn';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 375px;
  align-items: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid black 0.5px;
    width: 100px;
`

const ExpandContainer = styled.div`
  display: flex;
  height: ${(props) => (props.expand ? '100vh' : '0')};
  overflow-y: ${(props) => (props.expand ? 'auto' : 'hidden')};
  flex-direction: column;
`;

const RadioContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const RadioGroup = styled.div`
margin-bottom: 20px;`

export const FilterMenu = ({ isNew, search }) => {
  const [value, setValue] = useState({
    players: '',
    age: '',
    playtime: '',
    year: '',
  });
  const [expand, setExpand] = useState(false);

  const handleChange = (props) => (e) => {
    setValue({ ...value, [props]: e.target.value });
  };

  const handleClick = () => {};

  const renderFilter = () => {
    if (search) {
      return (
        <RadioContainer>
          {search.includes('players') ? (
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
          {search.includes('playtime') ? (
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
          {search.includes('age') ? (
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
          {isNew || search.includes('year') ? (
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
