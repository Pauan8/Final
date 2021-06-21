import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useHistory,  useParams } from 'react-router';
import { useDispatch } from 'react-redux';

import picArray from '../data/picArray.json';
import { editProfile } from '../reducers/user';
import { Select } from '../components/Reusable/Select';
import { Button } from '../components/Reusable/Button';
import { TextInput } from '../components/Reusable/TextInput';
import { regexArr } from '../data/regExValdate';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  `
const ButtonContainer = styled.div`
  margin-top: 50px;`

const SelectContainer = styled.div`
  margin: 50px 0;` 

const EditProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const [value, setValue] = useState({
    avatar: '',
    name: '',
    surname: '',
    e_mail: '',
    description: '',
    age: '',
  });
  const handleChange = (e) => {
    setValue({ ...value, avatar: e.target.value });
  };

  const handleClick = () => {
    dispatch(
      editProfile(
        testContent(value.avatar),
        testContent(value.name),
        testContent(value.surname),
        testContent(value.e_mail),
        testContent(value.description),
        testContent(value.age)
      )
    );
    history.push(`/Profile/${id}`)
  };

  const testContent = (props) => {
    return props != '' ? props : null;
  };

  return (
    <Wrapper>
      <SelectContainer>
        <Select
          arr={picArray}
          handleChange={handleChange}
          value={value.avatar}
          title='avatar'
        />
      </SelectContainer>
      <TextInput
        title='name'
        setValue={setValue}
        value={value}
        regexp={regexArr[1].regex}
      />
      <TextInput
        title='surname'
        setValue={setValue}
        value={value}
        regexp={regexArr[2].regex}
      />
      <TextInput
        title='e_mail'
        setValue={setValue}
        value={value}
        regexp={regexArr[3].regex}
      />
      <TextInput
        title='age'
        setValue={setValue}
        value={value}
        regexp={regexArr[4].regex}
      />
      <TextInput
        title='description'
        setValue={setValue}
        value={value}
        regexp={new RegExp(/[a-z]/)}
      />
      <ButtonContainer>
        <Button handleClick={handleClick} text='Save' />
      </ButtonContainer>
    </Wrapper>
  );
};

export default EditProfile;
